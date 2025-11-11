import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';

export const App: React.FC = () => {
  return (
    <>
      <NavBar />

      <div data-cy="app">
        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="people/:slug?" element={<PeoplePage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
