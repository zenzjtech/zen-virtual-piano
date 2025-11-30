import { combineReducers } from '@reduxjs/toolkit';
import pianoSettings from '@/store/reducers/piano-settings-slice'
import user from '@/store/reducers/user-slice'
import musicSheet from '@/store/reducers/music-sheet-slice'
import onboarding from '@/store/reducers/onboarding-slice'
import recording from '@/store/reducers/recording-slice'
import quoteSettings from '@/store/reducers/quote-settings-slice'
import theme from '@/store/reducers/theme-slice'
import i18n from '@/store/reducers/i18n-slice'

export default combineReducers({
    pianoSettings,
    user,
    musicSheet,
    onboarding,
    recording,
    quoteSettings,
    theme,
    i18n,
})