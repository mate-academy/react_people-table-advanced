import './App.scss';
import { Navigation } from './components/Navigation';
import { Navigate, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeopleProvider } from './context/PeopleContext';
import React from 'react';

export const App = () => (
  <div data-cy="app">
    <PeopleProvider>
      <Navigation />

      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PeopleProvider>
  </div>
);
