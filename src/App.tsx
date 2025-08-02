import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import React from 'react';
import { RedirectHome } from './components/RedirectHome';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/home" element={<RedirectHome />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
        </div>
      </div>
    </div>
  );
};
