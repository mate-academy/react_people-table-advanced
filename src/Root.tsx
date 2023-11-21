import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import { PeoplePage } from './pages/PeoplePage';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<ErrorPage />} />
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route path=":selectedName?" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default Root;
