import React from 'react';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <Routes>
        <Route path={'*'} element={<NotFoundPage />} />
        <Route path={'/'} element={<HomePage />} />
        <Route path={'home'} element={<Navigate to={'/'} replace />} />
        <Route path={'people'} element={<PeoplePage />}>
          <Route path={':slug'} element={<PeoplePage />} />
        </Route>
      </Routes>
    </div>
  );
};
