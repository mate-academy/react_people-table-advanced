import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Root } from './Root';
import React from 'react';
createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);

document.body.classList.add('has-navbar-fixed-top');
