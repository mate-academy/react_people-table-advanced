import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeopleLayout } from './components/layout/PeopleLayout';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route
          path="/"
          element={<PageLayout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="people"
            element={<PeopleLayout />}
          >
            <Route
              index
              element={<PeoplePage />}
            />
            <Route
              path=":slug"
              element={<PeoplePage />}
            />
          </Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </div>
  );
};
