import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeopleProvider } from './store/PeopleContext';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './Pages/PageNotFound';
import { FilterProvider } from './store/FilterContext';

export const Root = () => (
  <Router>
    <FilterProvider>
      <PeopleProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route index element={<HomePage />} />
            <Route path="people" element={<PeoplePage />}>
              <Route index element={<PeoplePage />} />
              <Route path=":slug?" />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </PeopleProvider>
    </FilterProvider>
  </Router>
);
