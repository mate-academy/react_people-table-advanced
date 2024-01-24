import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import FilterProvider from './context/FilterProvider';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <FilterProvider>
        <App />
      </FilterProvider>
    </HashRouter>,
  );
