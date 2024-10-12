import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people/:slug?" element={<PeoplePage />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
