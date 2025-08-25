/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/people" replace />} />
            <Route path="/people/*" element={<PeoplePage />} />
            <Route path="*" element={<h1 className="title">Page not found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
