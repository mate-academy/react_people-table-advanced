import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />

            <Route path="/people" element={<PeoplePage />} />

            <Route path="/people/:slug" element={<PeoplePage />} />

            {/* редірект з /home → / */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* 404 - якщо маршрут не знайдено */}
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
