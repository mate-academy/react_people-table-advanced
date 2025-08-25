import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />
    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* редірект із /home на корінь, як вимагає тест */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people/*" element={<PeoplePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </div>
);
