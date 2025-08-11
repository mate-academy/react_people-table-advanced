import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeopleProvider } from './store/peopleContext';
import { PeoplePage } from './pages/PeoplePage';
import { FiltersProvider } from './store/filtersContext';
import { SortProvider } from './store/sortContext';

export const Root = () => (
  <Router>
    <FiltersProvider>
      <SortProvider>
        <PeopleProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={'people/:persSlug?'} element={<PeoplePage />} />
              <Route path={'home'} element={<Navigate to=".." />} />
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Route>
          </Routes>
        </PeopleProvider>
      </SortProvider>
    </FiltersProvider>
    <App />
  </Router>
);
