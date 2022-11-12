import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App: React.FC = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Navbar />
        <div className="block">
          <div className="box table-container">
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/people">
                <Route index element={<PeoplePage />} />
                <Route path=":personSlug" element={<PeoplePage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </main>
  </div>
);
