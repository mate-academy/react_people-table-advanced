import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import cn from 'classnames';
import { PeoplePage } from './PeoplePage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

export const Navbar = () => {
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
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              People
            </NavLink>
            {/* <a className="navbar-item" href="#/">Home</a>

          <a
            aria-current="page"
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a> */}
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

        </div>
      </main>
    </>
  );
};
