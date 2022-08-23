import {
  Routes, Route, Navigate,
} from 'react-router-dom';

import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" />
          </Route>
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Route>
      </Routes>
    </div>
  );
};
