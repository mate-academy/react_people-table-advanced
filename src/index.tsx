import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { MainRoutes } from './router';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <MainRoutes />,
);
