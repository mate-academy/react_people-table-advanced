import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { AppProvider } from './Context/Context';

import App from './App';

ReactDOM.render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>,
  document.getElementById('root')
);
