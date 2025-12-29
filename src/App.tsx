import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Person } from './types/Person';
import { getPeople } from './api';

import './App.scss';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route
              path="/people"
              element={
                <PeoplePage people={people} loading={loading} error={error} />
              }
            />
            <Route
              path="/people/:slug"
              element={
                <PeoplePage people={people} loading={loading} error={error} />
              }
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
