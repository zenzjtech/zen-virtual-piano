import { StatisticsSlice } from '@/types/statistics-slice'
import { createSlice } from '@reduxjs/toolkit'

const defaultStatisticsState = (): StatisticsSlice => ({
    appOpenCount: 0,
})

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: defaultStatisticsState(),
    reducers: {
        incrementAppOpenCount(state: StatisticsSlice) {
            state.appOpenCount += 1
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementAppOpenCount } = statisticsSlice.actions

export const appOpenCountSelector = (state: { statistics: StatisticsSlice }) => state.statistics.appOpenCount

export default statisticsSlice.reducer
