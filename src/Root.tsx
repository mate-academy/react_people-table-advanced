import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeopleProvider } from './store/peopleContext';
import { PeoplePage } from './pages/PeoplePage';
import { FiltersProvider } from './store/filtersContext';

export const Root = () => (
  <FiltersProvider>
    <PeopleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={'people/:persSlug?'} element={<PeoplePage />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Route>
        </Routes>
        <App />
      </Router>
    </PeopleProvider>
  </FiltersProvider>
);
