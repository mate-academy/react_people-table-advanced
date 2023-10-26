import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './storage/AppContext/AppContext';
import { Home } from './components/Home/Home';
import { PeoplePage } from './components/People/PeoplePage';
import { PageNotFound } from './components/UtilityPages/PageNotFound';
import { Redirect } from './components/UtilityPages/Redirect';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="people">
            <Route path=":paramSlug?" element={<PeoplePage />} />
          </Route>
          <Route path="home" element={<Redirect />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </AppContextProvider>
  </Router>,
);
