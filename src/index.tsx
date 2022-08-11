import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { AppProvider } from './context';

import { App } from './App';

ReactDOM.render(
  <AppProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AppProvider>,
  document.getElementById('root'),
);
