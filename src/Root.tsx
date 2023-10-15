import {
  HashRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
// import { PeopleTable } from './components/PeopleTable';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
        <Route
          path="*"
          element={<p className="title">Page not found</p>}
        />
      </Route>
    </Routes>
  </HashRouter>
);
