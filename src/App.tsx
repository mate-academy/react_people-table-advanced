import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/Loader/HomePage';
import { NotFoundPage } from './components/Loader/NotFoundPage';

import { useParams, useLocation } from 'react-router-dom'


import './App.scss';

export const App = () => {
  const { pathname } = useLocation();

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
