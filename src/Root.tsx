import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { RoutesPathes } from './helper/RoutesPathes';

export const Root = () => (
  <Router>
    <Routes>
      <Route
        path="/home"
        element={<Navigate to={RoutesPathes.HOME} replace />}
      />
      <Route path={RoutesPathes.HOME} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={RoutesPathes.PEOPLE} element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
