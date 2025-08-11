// App.tsx
import { Loader } from './components/Loader';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { getPeople } from './api';
import { useEffect, useState } from 'react';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Person } from './types/Person';
import classNames from 'classnames';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

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
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              data-cy="navHome"
            >
              Home
            </NavLink>

            <NavLink
              to={{ pathname: '/people', search: location.search }}
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
              data-cy="navPeople"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="section" data-cy="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={
                loading ? (
                  <Loader data-cy="loader" />
                ) : error ? (
                  <p className="has-text-danger" data-cy="peopleLoadingError">
                    Something went wrong
                  </p>
                ) : people.length === 0 ? (
                  <p className="has-text-grey-light" data-cy="noPeopleMessage">
                    No people found
                  </p>
                ) : (
                  <PeoplePage people={people} />
                )
              }
            />
            <Route
              path="/people/:slug"
              element={
                loading ? (
                  <Loader data-cy="loader" />
                ) : error ? (
                  <p className="has-text-danger" data-cy="peopleLoadingError">
                    Something went wrong
                  </p>
                ) : people.length === 0 ? (
                  <p className="has-text-grey-light" data-cy="noPeopleMessage">
                    No people found
                  </p>
                ) : (
                  <PeoplePage people={people} />
                )
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
