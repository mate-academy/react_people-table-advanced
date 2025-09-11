import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <AppRouter />,
);
