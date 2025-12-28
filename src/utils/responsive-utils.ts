/**
 * Utility functions for responsive design
 */

const responsiveBreakpoint = '(max-width: 1400px) and (max-height: 900px)';
/**
 * Returns a media query style object that scales elements down on smaller screens
 * @param transformOrigin - The CSS transform-origin value (e.g., 'top left', 'top center', 'top right')
 * @param additionalStyles - Optional additional styles to merge into the media query
 * @returns Object containing the responsive scaling media query
 */
export const getResponsiveScale = (transformOrigin: string, additionalStyles?: Record<string, any>) => ({
  ['@media ' + responsiveBreakpoint]: {
    transform: 'scale(0.7)',
    transformOrigin,
    ...additionalStyles,
  },
});

/**
 * Returns a media query style object that applies styles on smaller screens
 * @param style - The styles to apply on smaller screens
 * @returns Object containing the responsive style media query
 */
export const getResponsiveStyle = (style?: Record<string, any>) => ({
  ['@media ' + responsiveBreakpoint]: {
    ...style,
  },
});

