import NavBar from './components/Navbar';

import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
