import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './Root';
import { GlobalStateProvider } from './store/Store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalStateProvider>
    <Root />
  </GlobalStateProvider>,
);
