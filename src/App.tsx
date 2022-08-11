import React from 'react';

import { Routes, Route, Navigate } from 'react-router';

import './App.scss';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { NewPerson } from './components/NewPerson';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <div className="mt-3">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" />} />
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":personSlug" element={<PeoplePage />} />
                <Route path="new" element={<NewPerson />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
