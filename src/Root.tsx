import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
// import { PeopleFilters } from './components/PeopleFilters';
// import { PeopleTable } from './components/PeopleTable';
import logo from './components/logo.png';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route
          path="*"
          element={(
            <>
              <h1 className="title">Page not found</h1>
              <img
                src={logo}
                alt="error not found"
                width="200"
                height="200"
              />
            </>
          )}
        />
      </Route>
    </Routes>
  </Router>
);
