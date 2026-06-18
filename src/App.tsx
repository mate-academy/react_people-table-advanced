import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};
