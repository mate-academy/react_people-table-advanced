import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { getPeople } from './api';
import { Person } from './types/Person';

import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

import { Home } from './components/Home';

import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        if (!mounted) {
          return;
        }

        setPeople(data);
        setLoading(false);
      })
      .catch(err => {
        if (!mounted) {
          return;
        }

        setError(String(err || 'Error fetching people'));
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
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
