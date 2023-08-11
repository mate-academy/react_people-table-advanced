import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
// import { HomePage } from './pages/HomePage';
// import { PeoplePage } from './pages/PeoplePage';
// import { NotFoundPage } from './pages/NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <App />
    </Router>,
  );
