import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';
// dashboard chart style
import { BaseOptionChartStyle } from './components/Home/Dashboard/chart/BaseOptionChart';
// theme
import ThemeProvider from './theme';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <HelmetProvider>
          <Router>
            <ThemeProvider>
              <BaseOptionChartStyle />
              <App />
            </ThemeProvider>
          </Router>
        </HelmetProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
