import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route index />
            <Route path=":slug" />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </div>
);
