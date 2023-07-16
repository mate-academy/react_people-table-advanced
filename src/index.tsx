import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { ContextProvider } from './components/Context/ContextProvider';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>,
  );
