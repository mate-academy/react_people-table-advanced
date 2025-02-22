import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { RouterRoot } from './router/RouterRoot';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <RouterRoot />,
);
