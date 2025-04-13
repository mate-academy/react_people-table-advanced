import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';
import Navbar from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people/*" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);
