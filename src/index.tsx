import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// import { App } from './App';
import React from 'react';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
