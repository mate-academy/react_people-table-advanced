import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { App } from './App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
