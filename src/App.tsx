import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { SearchLink } from './components/SearchLink';
import './App.scss';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  const getLinkClass = (isActive: boolean) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={({ isActive }) => getLinkClass(isActive)}
            >
              Home
            </NavLink>

            <SearchLink
              to="/people"
              params={{}}
              className={getLinkClass(pathname.startsWith('/people'))}
            >
              People
            </SearchLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people" element={<PeoplePage />}>
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
