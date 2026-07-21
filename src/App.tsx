import { PeoplePage } from './components/Pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

import React from 'react';
import { HomePage } from './components/Pages/HomePage';
import { PageNotFound } from './components/ErrorMessages/PageNotFound';

import { Routes, Route, Navigate } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
