import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import { Routes as AppRoutes } from './utils/constants';

export const Root: React.FC = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path={AppRoutes.HOME}
            element={<h1 className="title">Home Page</h1>}
          />
          <Route path={AppRoutes.NAVIGATE_HOME} element={<Navigate to="/" />} />
          <Route path={AppRoutes.PEOPLE}>
            <Route index element={<PeoplePage />} />
            <Route path={AppRoutes.PERSON} element={<PeoplePage />} />
          </Route>
          <Route
            path={AppRoutes.NOT_FOUND}
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </div>
    </main>
  </div>
);
