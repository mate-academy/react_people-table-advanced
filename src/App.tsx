import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/Homepage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';

import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
