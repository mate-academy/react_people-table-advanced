import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './Pages/NotFoundPage';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { PeopleTable } from './components/PeopleTable';
import { FiltersProvider } from './context/FiltersContext';

export const Root = () => (
  <Router>
    <FiltersProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />}>
            <Route index element={<PeopleTable />} />
            <Route path=":slug" element={<PeopleTable />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </FiltersProvider>
  </Router>
);
