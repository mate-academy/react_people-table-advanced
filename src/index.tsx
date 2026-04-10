import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import React from 'react';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(<Root />);
