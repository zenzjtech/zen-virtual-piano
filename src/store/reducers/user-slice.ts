import { UserSlice, GoogleUserInfo } from '@/types/user-slice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const defaultUserState = (): UserSlice => ({
    uid: '',
    analyticsEnabled: true,
    isAuthenticated: false,
    googleUser: null,
})

export const userSlice = createSlice({
    name: 'user',
    initialState: defaultUserState(),
    reducers: {
        setUserId(state: UserSlice, action: PayloadAction<string>) {
            state.uid = action.payload
        },
        setAnalyticsEnabled(state: UserSlice, action: PayloadAction<boolean>) {
            state.analyticsEnabled = action.payload
        },
        setGoogleUser(state: UserSlice, action: PayloadAction<GoogleUserInfo>) {
            state.googleUser = action.payload
            state.isAuthenticated = true
            state.uid = action.payload.id
        },
        logout(state: UserSlice) {
            state.googleUser = null
            state.isAuthenticated = false
            state.uid = ''
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUserId, setAnalyticsEnabled, setGoogleUser, logout } = userSlice.actions

export const userIdSelector = (state: UserSlice) => state.uid
export const googleUserSelector = (state: { user: UserSlice }) => state.user.googleUser
export const isAuthenticatedSelector = (state: { user: UserSlice }) => state.user.isAuthenticated

export default userSlice.reducer
