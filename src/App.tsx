import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
