import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people/:personSlug?" element={<PeoplePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
