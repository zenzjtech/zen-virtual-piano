import { Box, Container, Typography } from '@mui/material';
import { Piano } from '@/components/piano/piano';
import './App.css';

function App() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 4,
          py: 4,
        }}
      >
        <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
          🎹 Zen Virtual Piano
        </Typography>
        
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Play piano using your keyboard or click the keys with your mouse
        </Typography>

        <Piano />

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
          Sprint 1 MVP - Basic Piano Functionality
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
