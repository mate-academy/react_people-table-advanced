import classNames from 'classnames';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';

const PageNotFound = () => <h1 className="title">Page not found</h1>;
const HomePage = () => <h1 className="title">Home Page</h1>;

export const App = () => {
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
            <NavLink
              to="/"
              className={({ isActive }) => {
                return classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => {
                return classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug?" />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
