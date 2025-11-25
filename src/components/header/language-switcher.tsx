/**
 * Language Switcher component
 * Provides a dropdown menu for selecting the application language
 */

import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Language } from '@mui/icons-material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setLocale, type SupportedLocale } from '@/store/reducers/i18n-slice';
import { useTranslation } from '@/hooks/use-translation';
import { getIconColor } from './header-utils';
import { getIconButtonStyles, iconSizeStyles } from './header-styles';
import i18n from '@/lib/i18n/index';

interface LanguageSwitcherProps {
  isDarkBackground: boolean;
}

export const LanguageSwitcher = ({ isDarkBackground }: LanguageSwitcherProps) => {
  const { t } = useTranslation('common');
  const iconColor = getIconColor(isDarkBackground);
  
  // Language switcher state
  const dispatch = useAppDispatch();
  const currentLocale = useAppSelector(state => state.i18n.locale);
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelect = (locale: string) => {
    if (locale === 'auto') {
      // Detect browser language
      const browserLang = navigator.language.substring(0, 2);
      const detectedLocale = browserLang === 'ja' ? 'ja' : browserLang === 'vi' ? 'vi' : 'en';
      // Update Redux store
      dispatch(setLocale(detectedLocale as SupportedLocale));
      // Immediately change i18n language for instant UI update
      i18n.changeLanguage(detectedLocale);
    } else {
      // Update Redux store
      dispatch(setLocale(locale as SupportedLocale));
      // Immediately change i18n language for instant UI update
      i18n.changeLanguage(locale);
    }
    // Keep menu open for now as per user preference
  };

  const LOCALE_OPTIONS = [
    { locale: 'auto', label: '🌐 Auto/Browser Default', displayLabel: 'Auto/Browser Default' },
    { locale: 'en' as SupportedLocale, label: '🇺🇸 English', displayLabel: 'English' },
    { locale: 'ja' as SupportedLocale, label: '🇯🇵 日本語', displayLabel: '日本語' },
    { locale: 'vi' as SupportedLocale, label: '🇻🇳 Tiếng Việt', displayLabel: 'Tiếng Việt' },
    { locale: 'ko' as SupportedLocale, label: '🇰🇷 한국어', displayLabel: '한국어' },
    { locale: 'zh_CN' as SupportedLocale, label: '🇨🇳 简体中文', displayLabel: '简体中文' },
    { locale: 'zh_HK' as SupportedLocale, label: '🇭🇰 繁體中文', displayLabel: '繁體中文' },
    { locale: 'hi' as SupportedLocale, label: '🇮🇳 हिंदी', displayLabel: 'हिंदी' },
    { locale: 'es' as SupportedLocale, label: '🇪🇸 Español', displayLabel: 'Español' },
    { locale: 'fr' as SupportedLocale, label: '🇫🇷 Français', displayLabel: 'Français' },
    { locale: 'de' as SupportedLocale, label: '🇩🇪 Deutsch', displayLabel: 'Deutsch' },
    { locale: 'ru' as SupportedLocale, label: '🇷🇺 Русский', displayLabel: 'Русский' },
    { locale: 'pt_BR' as SupportedLocale, label: '🇧🇷 Português (Brasil)', displayLabel: 'Português (Brasil)' },
    { locale: 'id' as SupportedLocale, label: '🇮🇩 Bahasa Indonesia', displayLabel: 'Bahasa Indonesia' },
    { locale: 'tr' as SupportedLocale, label: '🇹🇷 Türkçe', displayLabel: 'Türkçe' },
    { locale: 'bn' as SupportedLocale, label: '🇧🇩 বাংলা', displayLabel: 'বাংলা' },
    { locale: 'mr' as SupportedLocale, label: '🇮🇳 मराठी', displayLabel: 'मराठी' },
    { locale: 'te' as SupportedLocale, label: '🇮🇳 తెలుగు', displayLabel: 'తెలుగు' },
    { locale: 'ta' as SupportedLocale, label: '🇮🇳 தமிழ்', displayLabel: 'தமிழ்' },
  ];

  // Get current language display name for tooltip
  const currentLanguageOption = LOCALE_OPTIONS.find(option => option.locale === currentLocale);
  const tooltipTitle = currentLanguageOption ? `Current: ${currentLanguageOption.displayLabel}` : 'Change language';

  return (
    <>
      <Tooltip title={tooltipTitle} placement="bottom" arrow>
        <IconButton
          onClick={handleLanguageClick}
          sx={getIconButtonStyles(iconColor, isDarkBackground)}
          aria-label={t('changeLanguage') || 'Change language'}
          aria-controls={isLanguageMenuOpen ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isLanguageMenuOpen ? 'true' : undefined}
        >
          <Language sx={iconSizeStyles} />
        </IconButton>
      </Tooltip>
      
      <Menu
        id="language-menu"
        anchorEl={languageAnchorEl}
        open={isLanguageMenuOpen}
        onClose={handleLanguageClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 150,
            bgcolor: isDarkBackground ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            color: isDarkBackground ? 'white' : 'black',
            '& .MuiMenuItem-root': {
              fontSize: '0.9rem',
              py: 1,
              '&:hover': {
                bgcolor: isDarkBackground ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              },
              '&.Mui-selected': {
                bgcolor: isDarkBackground ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  bgcolor: isDarkBackground ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)',
                },
              },
            },
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LOCALE_OPTIONS.map((option) => (
          <MenuItem 
            key={option.locale} 
            selected={option.locale === currentLocale}
            onClick={() => handleLanguageSelect(option.locale)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
