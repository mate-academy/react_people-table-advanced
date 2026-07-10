import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { PeopleContext } from './context/PeopleContext';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <PeopleContext>
    <Root />
  </PeopleContext>,
);
