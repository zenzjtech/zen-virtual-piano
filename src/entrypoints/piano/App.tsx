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
        
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ fontStyle: 'italic' }}>
          4 Octaves • C2 to C6 • 49 Keys
        </Typography>

        <Piano />

        <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
          Extended keyboard range - Use number keys, letters, and symbols
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
