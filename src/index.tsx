import { createRoot } from 'react-dom/client';
import { Root } from './Root';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<Root />);
