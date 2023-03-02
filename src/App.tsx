import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NavigationBar } from './components/NavigationBar/Navbar';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

import './App.scss';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavigationBar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  </div>
);
