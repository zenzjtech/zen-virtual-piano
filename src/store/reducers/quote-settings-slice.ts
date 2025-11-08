import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuoteInterval = 'daily' | 'hourly' | '30min' | '10min' | '5min';

export interface QuoteSettingsState {
  showQuote: boolean;
  interval: QuoteInterval;
  showOnlyFavorites: boolean;
  favoriteQuoteIds: string[];
  lastQuoteChangeDate: string; // ISO date string for daily tracking
  currentQuoteId: string | null;
}

const initialState: QuoteSettingsState = {
  showQuote: true,
  interval: 'daily',
  showOnlyFavorites: false,
  favoriteQuoteIds: [],
  lastQuoteChangeDate: new Date().toISOString().split('T')[0], // Today's date
  currentQuoteId: null,
};

export const quoteSettingsSlice = createSlice({
  name: 'quoteSettings',
  initialState,
  reducers: {
    setShowQuote: (state, action: PayloadAction<boolean>) => {
      state.showQuote = action.payload;
    },
    setQuoteInterval: (state, action: PayloadAction<QuoteInterval>) => {
      state.interval = action.payload;
    },
    setShowOnlyFavorites: (state, action: PayloadAction<boolean>) => {
      state.showOnlyFavorites = action.payload;
    },
    toggleFavoriteQuote: (state, action: PayloadAction<string>) => {
      const quoteId = action.payload;
      const index = state.favoriteQuoteIds.indexOf(quoteId);
      if (index > -1) {
        state.favoriteQuoteIds.splice(index, 1);
      } else {
        state.favoriteQuoteIds.push(quoteId);
      }
    },
    setLastQuoteChangeDate: (state, action: PayloadAction<string>) => {
      state.lastQuoteChangeDate = action.payload;
    },
    setCurrentQuoteId: (state, action: PayloadAction<string | null>) => {
      state.currentQuoteId = action.payload;
    },
  },
});

export const {
  setShowQuote,
  setQuoteInterval,
  setShowOnlyFavorites,
  toggleFavoriteQuote,
  setLastQuoteChangeDate,
  setCurrentQuoteId,
} = quoteSettingsSlice.actions;

export default quoteSettingsSlice.reducer;
