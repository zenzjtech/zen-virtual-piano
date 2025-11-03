import { ExtendedStore } from "reduxed-chrome-storage";
import { guid, wait } from "./misc";
import mixpanel from 'mixpanel-browser';
import { setUserId } from "@/store/reducers/user-slice";
import { shouldTrackUserActivity } from "./env";

export const initMixpanel = () => {    
    mixpanel.init(import.meta.env.WXT_MIXPANEL_TOKEN || "", {        
        debug: import.meta.env.DEV,
        cross_subdomain_cookie: false,
        persistence: 'localStorage',
        batch_requests: false,
        // @ts-ignore Not sure this prop exist
        track_pageview: false,
        //autocapture: true,
        //record_sessions_percent: 100,        
        verbose: import.meta.env.DEV
    });
}

export const getOrCreateUserId = (store: ExtendedStore) => {
    let userId = store.getState().user.uid    
    if (!userId) {        
        userId = guid();
        store.dispatch(setUserId(userId));
    }

    return userId;
};

export const trackEvent = async (userId: string, eventName: string, props: Record<string, any> = {}, timeout = 300) => {
    if (!shouldTrackUserActivity())
        return;
    
    if (!userId)
        return;
    
    // Add extension version to all events
    const extensionVersion = chrome.runtime.getManifest().version;
    const enhancedProps = {
        ...props,
        extension_version: extensionVersion
    };
    
    mixpanel.identify(userId);
    const promise = new Promise<void>((resolve) => {
        mixpanel.track(eventName, enhancedProps, () => resolve());
    });

    return Promise.race([
        wait(timeout),
        promise
    ])
};

export const getPageLocationFromUrl = (currentUrl: string, defaultLocation?: string): string => {
    try {
        const currentPath = new URL(currentUrl).pathname; // e.g., "/options.html"
        // Remove leading '/' and common file extensions like .html or .htm
        const pageName = currentPath.substring(1).replace(/\.(html|htm)$/, '');
        if (pageName) {
            return pageName;
        }
    } catch (error) {
        console.warn(`Could not determine page_location from URL "${currentUrl}", defaulting to "${defaultLocation}":`, error);
    }
    return defaultLocation || '';
};

/*
'chrome-extension://pdkococebapdcdnmehdappiffconjhbh/sidepanel.html#/record-session' -> 'record-session'
*/
export const getHashFragmentFromUrl = (currentUrl: string): string => {
    try {
        const hash = new URL(currentUrl).hash;
        // Remove leading '#' if it exists, otherwise return empty string
        return hash ? hash.substring(1) : '';
    } catch (error) {
        console.warn(`Could not determine hash fragment from URL "${currentUrl}":`, error);
        return '';
    }
};

export const trackPageEvent = async (
    userId: string,
    eventCategory: string,
    eventAction: string,
    additionalProps: Record<string, any> = {},
    currentUrl: string = document.URL, // Default to current document URL
    timeout = 300
) => {
    const page_location = getPageLocationFromUrl(currentUrl);
    const page_path = getHashFragmentFromUrl(currentUrl);

    const props = {
        event_category: eventCategory,
        event_action: eventAction,
        ...additionalProps,
        page_location,
        page_path,
    };

    return trackEvent(userId, eventAction, props, timeout);
};