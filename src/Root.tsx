import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { ContextProvider } from './Hooks';
import { People } from './pages/People';
import { PageNotFound } from './pages/PageError';
// import { PeopleDetails } from './pages/PeopleDetails';

export const Root = () => (
  <Router>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="people">
            <Route index element={<People />} />
            <Route path=":personSlug" element={<People />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </ContextProvider>
  </Router>
);
