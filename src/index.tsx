import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { AppProvider } from './providers/AppProvider';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>,
  );
