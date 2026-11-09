import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import HomePage from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

export const App = () => {
  return (
    <HashRouter>
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/people/:slug" element={<PeoplePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};
