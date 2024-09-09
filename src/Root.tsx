import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
// eslint-disable-next-line import/extensions
import { PageNotFound } from './page/PageNotFound';
import { HomePageTitle } from './page/HomePageTitle';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<PageNotFound />} />

          <Route index element={<HomePageTitle />} />

          <Route path="people">
            <Route path=":slugParam?" element={<PeoplePage />} />
          </Route>

          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
