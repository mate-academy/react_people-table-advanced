import './App.scss';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export const App = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link
              to="/"
              className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            >
              People
            </Link>
          </div>
        </div>
      </nav>
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:personId" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
