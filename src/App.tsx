import { useState } from 'react';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from './types';

import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={`${to}`}
  >
    {text}
  </NavLink>
);

export const App = () => {
  const [activePerson, setActivePerson] = useState<Person | null>(null);
  
  return (
    <div data-cy="app">
      <Navbar />

      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <PageNavLink to="/" text="Home" />
            <PageNavLink to="/people" text="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/people"
              element={(
                <PeoplePage
                  activePerson={activePerson}
                  setActivePerson={setActivePerson}
                />
              )}
            />

            <Route
              path={`/people/:${activePerson?.slug}`}
              element={(
                <PeoplePage
                  activePerson={activePerson}
                  setActivePerson={setActivePerson}
                />
              )}
            />

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
