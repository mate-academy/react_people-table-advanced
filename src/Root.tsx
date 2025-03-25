import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';
import { FiltersProvider } from './store/FiltersContext';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <FiltersProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Navigate to={'/'} />} />
            <Route index element={<HomePage />} />
            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </FiltersProvider>
    </PeopleProvider>
  </Router>
);
