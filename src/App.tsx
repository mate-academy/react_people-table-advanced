import { PeoplePage } from './components/PeoplePage';

import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":path" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
