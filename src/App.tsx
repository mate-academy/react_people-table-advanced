import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
