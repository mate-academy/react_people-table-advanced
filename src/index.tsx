import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Root } from './Root';

const container = document.getElementById('root') as HTMLElement;

document.documentElement.classList.add('has-navbar-fixed-top');
createRoot(container).render(<Root />);
