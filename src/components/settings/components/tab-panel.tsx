/**
 * Tab panel wrapper with fade animation
 */

import { Box, Fade } from '@mui/material';
import type { TabPanelProps } from '../types';

export const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`settings-tabpanel-${index}`}
    aria-labelledby={`settings-tab-${index}`}
  >
    {value === index && (
      <Fade in={value === index} timeout={250}>
        <Box sx={{ py: 3 }}>{children}</Box>
      </Fade>
    )}
  </div>
);
