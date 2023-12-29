import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';
import './App.scss';
import { Homepage } from './pages/Homepage';
import { NotFoundPage } from './pages/NotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="" element={<Homepage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
            <Route path="/people/" element={<PeoplePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
