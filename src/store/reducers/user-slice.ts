import { UserSlice } from '@/types/user-slice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const defaultUserState = (): UserSlice => ({
    uid: '',
    analyticsEnabled: true,
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
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUserId, setAnalyticsEnabled } = userSlice.actions

export const userIdSelector = (state: UserSlice) => state.uid

export default userSlice.reducer
