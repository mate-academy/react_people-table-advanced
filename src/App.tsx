import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

import cn from 'classnames';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';

const getMenuLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

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
            <NavLink to="/" className={getMenuLinkClass}>
              Home
            </NavLink>

            <NavLink to="/people" className={getMenuLinkClass}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route
              path="/"
              element={
                <h1 className="title">Home Page</h1>
              }
            />

            <Route
              path="/people"
            >
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
