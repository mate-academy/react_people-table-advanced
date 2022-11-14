import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/pages/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
      </Routes>
    </main>
  </div>
);
