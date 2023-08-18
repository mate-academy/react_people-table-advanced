import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Router } from './Router';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router />,
  );
