import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router as routes } from './router';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <RouterProvider router={routes}/>
);
