import { PeoplePage } from './components/PeoplePage';
import { NavBar } from './components/Navbar';

import './App.scss';
import React from 'react';
import { HomePage } from './components/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  </div>
);
