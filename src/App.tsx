import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people/:slug?" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </div>
);
