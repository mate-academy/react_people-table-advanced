/* eslint-disable max-len */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './App.scss';
import { NavBar } from './components/NavBar/NavBar';

export const App: React.FC = () => (
  <div data-cy="app">
    <main className="section">
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/"
          element={(
            <div className="container">
              <h1 className="title">Home Page</h1>
            </div>
          )}
        />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":personName" element={<PeoplePage />} />
        </Route>
        <Route
          path="*"
          element={(
            <h1 className="title">Page not found</h1>
          )}
        />
      </Routes>

      <NavBar />
    </main>
  </div>
);
