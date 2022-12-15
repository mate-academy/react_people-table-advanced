import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// Pages
import { PeoplePage } from './components/PeoplePage';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';

const AppRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":personeSlug" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouting;
