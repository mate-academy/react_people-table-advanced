import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { GlobalStateProvider } from './Store';
import { PeopleApp } from './components/PeopleApp';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalStateProvider>
    <PeopleApp />
  </GlobalStateProvider>,
);
