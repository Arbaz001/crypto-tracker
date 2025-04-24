import { Provider } from 'react-redux';
import { Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import CryptoTable from './components/CryptoTable';
import { store } from './store/store';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Provider store={store}>
      <Container 
        maxWidth={false} 
        sx={{ 
          width: '100%', 
          p: '0 !important',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center"
          sx={{ 
            fontWeight: 700,
            fontSize: isMobile ? '1.5rem' : '2.5rem',
            py: isMobile ? 1 : 2,
            px: 2
          }}
        >
          Crypto Price Tracker
        </Typography>
        <Box sx={{ flex: 1, overflow: 'auto', px: isMobile ? 0 : 2 }}>
          <CryptoTable />
        </Box>
      </Container>
    </Provider>
  );
}

export default App;
