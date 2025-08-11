import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route path=":personName?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
