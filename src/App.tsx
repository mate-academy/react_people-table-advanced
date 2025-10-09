// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import React from 'react';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<h1>Person Details</h1>} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
      </section>
    </div>
  );
};
