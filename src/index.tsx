import { createRoot } from 'react-dom/client';

import { Root } from './components/Root';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<Root />);
