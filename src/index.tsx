import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Root } from './Root';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
