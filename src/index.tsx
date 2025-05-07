import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Home } from './pages/home';
import { PeoplePage } from './components/PeoplePage';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":peopleName" element={<PeoplePage />} />
        </Route>
      </Route>
      <Route path="*" element={<h1 className="title">Page not found</h1>} />
    </Routes>
    <App />
  </Router>,
);
