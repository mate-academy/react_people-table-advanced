import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PeopleNotFound } from './components/PeopleNotFound';
import { PeoplePage } from './components/PeoplePage';
import React from 'react';
import { NavBar } from './components/Navbar';
import { Home } from './components/Loader/Home';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people/:selected?" element={<PeoplePage />} />

            <Route path="*" element={<PeopleNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
