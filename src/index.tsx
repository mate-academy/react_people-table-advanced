import { createRoot } from 'react-dom/client';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import { Root } from './Root';

const container = document.getElementById('root')!;

createRoot(container).render(<Root />);
