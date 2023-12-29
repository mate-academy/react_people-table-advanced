import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PageNotFound } from './Pages/PageNotFound/PageNotFound';
import { PeoplePage } from './Pages/PeoplePage';
import { HomePage } from './Pages/HomePage/HomePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
