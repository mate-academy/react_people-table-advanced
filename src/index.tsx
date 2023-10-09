import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Homepage } from './pages/Homepage';
import { Page404 } from './pages/Page404';
import { People } from './pages/People';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="people">
          <Route path=":human?/:search?" element={<People />}>
            {/* <Route path=":search?" element={<People />} /> */}
          </Route>
        </Route>
      </Route>
    </Routes>
  </Router>,
);
