import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { MainLayout } from './layouts/MainLayout';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />

        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);
