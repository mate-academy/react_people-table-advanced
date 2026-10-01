import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';

const AppContent = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people/:slug?" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};
