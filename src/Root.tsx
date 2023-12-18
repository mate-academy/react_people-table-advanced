import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { PeopleProvider } from './components/PeopleContext';
import { FilterProvider } from './components/FilterContext';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<h1 className="title">Home Page</h1>} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route />

            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
          </Route>
        </Routes>
      </FilterProvider>
    </PeopleProvider>
  </Router>
);
