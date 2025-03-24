import React from 'react';
import './App.scss';
import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => (
  <HashRouter>
    <div data-cy="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </HashRouter>
);
