import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => (
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
