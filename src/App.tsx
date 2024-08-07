import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NoPage from './components/NoPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
