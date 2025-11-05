/**
 * Onboarding Redux Slice
 * 
 * Manages state for onboarding/guide UI including:
 * - Whether to show onboarding
 * - Which step user is on
 * - Whether user has completed onboarding
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Onboarding state interface
 */
export interface OnboardingState {
  /** Whether onboarding has been completed */
  hasCompletedOnboarding: boolean;
  /** Whether onboarding overlay is currently visible */
  isOnboardingVisible: boolean;
  /** Current onboarding step (for multi-step onboarding in future) */
  currentStep: number;
}

/**
 * Initial state
 */
const initialState: OnboardingState = {
  hasCompletedOnboarding: false,
  isOnboardingVisible: false,
  currentStep: 0,
};

/**
 * Onboarding slice
 */
export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    /**
     * Show onboarding overlay
     */
    showOnboarding: (state) => {
      if (!state.hasCompletedOnboarding) {
        state.isOnboardingVisible = true;
      }
    },

    /**
     * Hide onboarding overlay
     */
    hideOnboarding: (state) => {
      state.isOnboardingVisible = false;
    },

    /**
     * Complete onboarding (permanently dismiss)
     */
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true;
      state.isOnboardingVisible = false;
    },

    /**
     * Reset onboarding (for testing or re-showing)
     */
    resetOnboarding: (state) => {
      state.hasCompletedOnboarding = false;
      state.isOnboardingVisible = false;
      state.currentStep = 0;
    },

    /**
     * Set current step
     */
    setOnboardingStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

// Export actions
export const {
  showOnboarding,
  hideOnboarding,
  completeOnboarding,
  resetOnboarding,
  setOnboardingStep,
} = onboardingSlice.actions;

// Export reducer
export default onboardingSlice.reducer;
