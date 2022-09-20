/* eslint-disable */
import './App.scss';
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    navigate('./');
  }, []);

  const handlePeopleSave = async () => {
    await getPeople()
      .then(people => {
        people.length > 0
          ? setPeople(people)
          : setError('There are no people on the server');
      })
      .catch(() => setError('Something went wrong'));
  };

  return (
    <div data-cy="app">
      <Navbar onPeopleSave={handlePeopleSave} />

      <div className="section">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="people"
            element={(
              <PeoplePage
                people={people}
                error={error}
              />
            )}
          />
          <Route
            path="people/:slug"
            element={(
              <PeoplePage
                people={people}
                error={error}
              />
            )}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
    </div>
  );
};
