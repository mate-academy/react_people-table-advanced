import './App.scss';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

type LinkProps = {
  isActive: boolean;
};

const getNavLinkClass = ({ isActive }: LinkProps) => {
  return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
};

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={getNavLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);
