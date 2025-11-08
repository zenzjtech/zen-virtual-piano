/**
 * Hook for quote selection logic
 * Handles quote rotation based on interval settings
 */

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { quotes, type Quote } from '@/lib/quote';
import {
  setLastQuoteChangeDate,
  setCurrentQuoteId,
} from '@/store/reducers/quote-settings-slice';

export const useQuoteSelector = () => {
  const dispatch = useAppDispatch();
  const quoteSettings = useAppSelector((state) => state.quoteSettings);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  // Get available quotes based on settings
  const getAvailableQuotes = (): Quote[] => {
    if (quoteSettings.showOnlyFavorites && quoteSettings.favoriteQuoteIds.length > 0) {
      return quotes.filter((q) => q.id && quoteSettings.favoriteQuoteIds.includes(q.id));
    }
    return quotes;
  };

  // Select a new random quote
  const selectNewQuote = () => {
    const availableQuotes = getAvailableQuotes();
    if (availableQuotes.length === 0) return null;
    
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    return randomQuote;
  };

  // Check if quote should change based on interval
  const shouldChangeQuote = (): boolean => {
    const now = new Date();
    const lastChangeDate = new Date(quoteSettings.lastQuoteChangeDate);
    
    switch (quoteSettings.interval) {
      case 'daily': {
        const today = now.toISOString().split('T')[0];
        const lastChange = lastChangeDate.toISOString().split('T')[0];
        return today !== lastChange;
      }
      case 'hourly': {
        const hoursDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 36e5;
        return hoursDiff >= 1;
      }
      case '30min': {
        const minutesDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
        return minutesDiff >= 30;
      }
      case '10min': {
        const minutesDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
        return minutesDiff >= 10;
      }
      case '5min': {
        const minutesDiff = Math.abs(now.getTime() - lastChangeDate.getTime()) / 6e4;
        return minutesDiff >= 5;
      }
      default:
        return false;
    }
  };

  // Initialize and handle quote changes
  useEffect(() => {
    if (!quoteSettings.showQuote) return;

    // Initialize quote if not set
    if (!currentQuote) {
      const newQuote = selectNewQuote();
      setCurrentQuote(newQuote);
      if (newQuote?.id) {
        dispatch(setCurrentQuoteId(newQuote.id));
      }
      return;
    }

    // Check if quote should change based on interval
    const checkInterval = setInterval(() => {
      if (shouldChangeQuote()) {
        const newQuote = selectNewQuote();
        if (newQuote) {
          setCurrentQuote(newQuote);
          dispatch(setLastQuoteChangeDate(new Date().toISOString()));
          if (newQuote.id) {
            dispatch(setCurrentQuoteId(newQuote.id));
          }
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(checkInterval);
  }, [quoteSettings.showQuote, quoteSettings.interval, quoteSettings.showOnlyFavorites, quoteSettings.favoriteQuoteIds, currentQuote]);

  return {
    currentQuote,
    showQuote: quoteSettings.showQuote,
    favoriteQuoteIds: quoteSettings.favoriteQuoteIds,
  };
};
