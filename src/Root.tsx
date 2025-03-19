import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
