import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const Routers = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<Navigate to={'/'} />} />
    <Route path="/people" element={<PeoplePage />}>
      <Route path=":slug" element={<PeoplePage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
