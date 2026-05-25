import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Home } from './components/Home';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
