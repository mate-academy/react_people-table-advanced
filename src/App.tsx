import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

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
            element={<PeoplePage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </div>
  );
};
