/**
 * Shared types for header-quote components
 */

import type { HeaderTypographyStyle } from '../header-typography';
import type { QuoteStyle } from '../../piano/quote-styles';

export interface HeaderQuoteProps {
  isDarkBackground: boolean;
  headerStyle?: HeaderTypographyStyle;
  category?: string;
  quoteStyle?: QuoteStyle;
  onOpenSettings?: (tab?: string) => void;
}
