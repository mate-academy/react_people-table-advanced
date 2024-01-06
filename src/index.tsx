import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './Root';

const rootElement = document.getElementById('root') as HTMLDivElement;

createRoot(rootElement)
  .render(
    <Root />,
  );
