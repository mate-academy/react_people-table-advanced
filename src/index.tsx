import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './Root';
import { GlobalProvider } from './context/GlobalProvider';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <GlobalProvider>
    <Root />
  </GlobalProvider>,
);
