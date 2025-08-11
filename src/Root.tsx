import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<Outlet />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
