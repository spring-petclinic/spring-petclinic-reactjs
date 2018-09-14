import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-roboto';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './state/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#003f66',
      light: '#4d97c5',
      main: '#006994'
    },
    secondary: {
      contrastText: '#fff',
      dark: '#bb4d00',
      light: '#ffad42',
      main: '#f57c00'
    }
  }
});

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.Fragment>
    <CssBaseline />
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.Fragment>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

registerServiceWorker();
