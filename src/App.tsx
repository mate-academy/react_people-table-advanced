import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { Layout } from './components/Layout';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);
