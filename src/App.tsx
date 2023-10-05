import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/Pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};
