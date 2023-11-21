/* eslint-disable max-len */
import {
  NavLink, Navigate, Route, Routes,
}
  from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>

            <NavLink to="/people" className={getLinkClass}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          {/* <h1 className="title">Home Page</h1>
        <h1 className="title">People Page</h1>
        <h1 className="title">Page not found</h1> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
