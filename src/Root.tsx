import {
  Navigate,
  Route,
  HashRouter,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
// import { PeopleFilters } from './components/PeopleFilters';
// import { PeopleTable } from './components/PeopleTable';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navbar  />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route
          path="people"
        >
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>}
            />
      </Route>
    </Routes>
  </HashRouter>
);