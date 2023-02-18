import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { NavBar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="title">Home Page</h1>
              }
            />

            <Route
              path="/people"
              element={
                <PeoplePage />
              }
            />
            <Route
              path="/people/:personSlug"
              element={
                <PeoplePage />
              }
            />
            <Route
              path="/home"
              element={(
                <Navigate
                  to="/"
                  replace
                />
              )}
            />
            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
