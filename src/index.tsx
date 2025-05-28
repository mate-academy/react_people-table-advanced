import 'bulma/css/bulma.css';
import { Root } from './Root';
import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
