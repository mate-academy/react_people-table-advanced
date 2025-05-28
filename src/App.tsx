import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

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
