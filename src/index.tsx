import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './routes/Root';
import { PeopleProvider } from './context';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <PeopleProvider>
      <Root />
    </PeopleProvider>,
  );
