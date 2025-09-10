import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';

createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);
