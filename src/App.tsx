import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PeoplePage } from './pages/PeoplePage';

import './App.scss';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { ErrorPage } from './pages/ErrorPage';

export const App: FC = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
};
