import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
