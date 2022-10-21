import React from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route index element={<HomePage />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path="/people/:personSlug" element={<PeoplePage />} />
            </Route>

            <Route path="/home" element={<Navigate replace to="/" />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
