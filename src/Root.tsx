import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personId" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
