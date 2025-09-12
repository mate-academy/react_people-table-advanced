import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');
createRoot(rootEl).render(<AppRouter />);
