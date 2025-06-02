// import { Loader } from './Loader';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import React from 'react';
import {
  //Link,
  Outlet,
  NavLink,
  //useParams,
  useLocation,
  // useParams,
  Link,
  useParams,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
interface Options {
  isActive: boolean;
}
const getLinkActive = ({ isActive }: Options) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

const getLinkStyle = ({ isActive }: Options) => ({
  color: isActive ? 'red' : '',
});

export const App = () => {
  const { pathname, search } = useLocation();
  const { slug } = useParams();

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
            <Link to="/" className="navbar-item">
              <img src="/logo.svg" alt="MA" className="logo" />
            </Link>
            <NavLink to="/" className={getLinkActive} style={getLinkStyle}>
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={getLinkActive}
              style={getLinkStyle}
            >
              People
            </NavLink>
            {slug && (
              <NavLink
                to={`/${slug}`}
                className={getLinkActive}
                style={getLinkStyle}
              >
                {slug}
              </NavLink>
            )}

            {/*<a className="navbar-item" href="#/">
              Home
            </a>

            <a
              className="navbar-item has-background-grey-lighter"
              href="#/people"
            >
              People
            </a>*/}
          </div>
        </div>
      </nav>

      <div className="section">
        {false && <p className="title is-5 has-text-info">{pathname}</p>}
        {search && (
          <p className="title is-6">
            {search && search.replaceAll('&', ' & ')}
          </p>
        )}

        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
