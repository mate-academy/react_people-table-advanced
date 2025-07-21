import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createRoot } from 'react-dom/client';
import { Root } from './Root';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<Root />);
