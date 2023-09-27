import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import { HomePage } from '../HomePage';
import { PeoplePage } from '../PeoplePage';
import { NotFoundPage } from '../NotFoundPage';

export const Navigation = () => {
  return (
    <>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={({ isActive }) => classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={({ isActive }) => classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              People
            </NavLink>

          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />
        <Route
          path="/home"
          element={<Navigate to="/" />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  );
};
