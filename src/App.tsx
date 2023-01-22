import React, { FC } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'components/organisms';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['DM Sans', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'DM Sans';
        src: local('DMSans-Bold'),
          url('./assets/fonts/primary/DMSans-Bold.ttf') format('truetype');
        font-weight: bold;
      }, @font-face {
        font-family: 'DM Sans';
        src: local('DMSans-Medium'),
          url('./assets/fonts/primary/DMSans-Medium.ttf') format('truetype');
        font-weight: normal;
      }
      `,
    },
  },
});

const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
