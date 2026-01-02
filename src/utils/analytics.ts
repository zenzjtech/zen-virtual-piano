import { ExtendedStore } from "reduxed-chrome-storage";
import { guid, wait } from "./misc";
import mixpanel from 'mixpanel-browser/src/loaders/loader-module-core';
import { isExtension } from "./env";
import { setUserId } from "@/store/reducers/user-slice";
import { shouldTrackUserActivity } from "./env";
import { RootState } from "@/store";

/**
 * Analytics singleton class that wraps all Mixpanel tracking functionality.
 * Use `Analytics.getInstance()` to get the singleton instance.
 * 
 * @example
 * // Initialize with store
 * const store = await instantiateGlobalStore();
 * analytics.init(store);
 * 
 * // Track events (userId is automatically retrieved from store)
 * analytics.trackEvent('Button Clicked', { buttonName: 'submit' });
 * analytics.trackPageEvent(EventCategory.PAGE_VIEW, 'Home Page Viewed');
 */
class Analytics {
    private static instance: Analytics | null = null;
    private initialized = false;
    private store: ExtendedStore | null = null;

    private constructor() {
        // Private constructor to enforce singleton pattern
    }

    /**
     * Get the singleton instance of Analytics
     */
    public static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics();
        }
        return Analytics.instance;
    }

    /**
     * Initialize Mixpanel with the configured token and store the Redux store reference
     * @param store - The Redux store instance from reduxed-chrome-storage
     * @param initMixpanel - Whether to initialize Mixpanel (defaults to true)
     */
    public init(store: any, initMixpanel: boolean = true): void {
        // Always update the store reference
        this.store = store;
        
        if (this.initialized || !initMixpanel) {
            return;
        }

        const token = import.meta.env.WXT_MIXPANEL_TOKEN || import.meta.env.VITE_MIXPANEL_TOKEN || "";
        const isDevEnv = import.meta.env.DEV;
        
        mixpanel.init(token, {
            debug: isDevEnv,
            cross_subdomain_cookie: false,
            persistence: 'localStorage',
            batch_requests: false,
            // @ts-ignore Not sure this prop exist
            track_pageview: false,
            verbose: isDevEnv
        });
        
        this.initialized = true;
    }

    /**
     * Get the Redux store instance
     */
    public getStore(): ExtendedStore | null {
        return this.store;
    }

    /**
     * Get or create a user ID from the store
     */
    public getOrCreateUserId(): string {
        if (!this.store) {
            console.warn('Analytics: Store not initialized. Call init(store) first.');
            return '';
        }
        
        let userId = this.store.getState().user.uid;
        if (!userId) {
            userId = guid();
            this.store.dispatch(setUserId(userId));
        }
        return userId;
    }

    /**
     * Get the current user ID from the store
     */
    public getUserId(): string {
        if (!this.store) {
            return '';
        }
        const uid = this.store.getState().user.uid || '';
        return uid;
    }

    /**
     * Get user settings from the Redux store to attach to every event
     * These settings are from the Analytics table (not Record page)
     */
    private getUserSettings(): Record<string, any> {
        if (!this.store) {
            return {};
        }

        const state: RootState = this.store.getState();
        const theme = state.theme;
        const pianoSettings = state.pianoSettings;
        const locale = state.i18n.locale;
        const statistics = state.statistics;

        return {
            settings: {
                devicePixelRatio: window.devicePixelRatio,
                locale,
                appOpenCount: statistics.appOpenCount,
                theme: {
                    pianoTheme: theme.pianoTheme,
                    backgroundTheme: theme.backgroundTheme,
                    musicSheetTheme: theme.musicSheetTheme,
                    patternTheme: theme.patternTheme,
                },
                pianoSettings: {
                    soundSet: pianoSettings.soundSet,
                    sustain: pianoSettings.sustain,
                    showKeyboard: pianoSettings.showKeyboard,
                },
            },
        };
    }

    /**
     * Track a custom event
     * User ID is automatically retrieved from the store
     */
    public async trackEvent(
        eventName: string,
        props: Record<string, any> = {},
        timeout = 300
    ): Promise<void> {
        if (!shouldTrackUserActivity()) return;
        
        const userId = this.getUserId();
        if (!userId) return;
        if (props && props.page_location === 'toast-content') return;

        // Add extension version and user settings to all events
        let extensionVersion = '0.0.0';
        let browserLocale = navigator.language;

        if (isExtension()) {
            try {
                extensionVersion = chrome.runtime.getManifest().version;
                browserLocale = chrome.i18n.getUILanguage();
            } catch (e) {
                console.warn('Analytics: Failed to get extension info', e);
            }
        } else {
            // Electron
            try {
                extensionVersion = await (window.api as any)?.getAppVersion() || '1.0.0';
            } catch (e) {
                console.warn('Analytics: Failed to get app version', e);
            }
        }
        
        const userSettings = this.getUserSettings();
        
        const enhancedProps = {
            ...props,
            extension_version: extensionVersion,
            browser_locale: browserLocale,
            build_channel: import.meta.env.VITE_BUILD_CHANNEL,
            ...userSettings,
        };

        mixpanel.identify(userId);
        const promise = new Promise<void>((resolve) => {
            mixpanel.track(eventName, enhancedProps, () => resolve());
        });

        return Promise.race([wait(timeout), promise]);
    }

    /**
     * Extract page location from URL
     */
    public getPageLocationFromUrl(currentUrl: string, defaultLocation?: string): string {
        try {
            const currentPath = new URL(currentUrl).pathname;
            const pageName = currentPath.substring(1).replace(/\.(html|htm)$/, '');
            if (pageName) {
                return pageName;
            }
        } catch (error) {
            console.warn(
                `Could not determine page_location from URL "${currentUrl}", defaulting to "${defaultLocation}":`,
                error
            );
        }
        return defaultLocation || '';
    }

    /**
     * Extract hash fragment from URL
     * e.g., 'chrome-extension://xxx/sidepanel.html#/record-session' -> '/record-session'
     */
    public getHashFragmentFromUrl(currentUrl: string): string {
        try {
            const hash = new URL(currentUrl).hash;
            return hash ? hash.substring(1) : '';
        } catch (error) {
            console.warn(`Could not determine hash fragment from URL "${currentUrl}":`, error);
            return '';
        }
    }

    /**
     * Track a page event with location and path information
     * User ID is automatically retrieved from the store
     */
    public async trackPageEvent(
        eventCategory: string,
        eventAction: string,
        additionalProps: Record<string, any> = {},
        currentUrl: string = document.URL,
        timeout = 300
    ): Promise<void> {
        const page_location = this.getPageLocationFromUrl(currentUrl);
        const page_path = this.getHashFragmentFromUrl(currentUrl);

        const props = {
            event_category: eventCategory,
            event_action: eventAction,
            ...additionalProps,
            page_location,
            page_path,
        };

        return this.trackEvent(eventAction, props, timeout);
    }
}

// Export the singleton instance
export const analytics = Analytics.getInstance();