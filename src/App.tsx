import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { Person, NewPerson } from './types';
import { getPeople } from './api';
import { Loader } from './components/Loader';
import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [newPeople, setNewPeople] = useState<NewPerson[]>([]);
  const location = useLocation();

  const isHomePage = location.pathname.endsWith('/home');

  const fetchPeople = async () => {
    try {
      const fetchedData = await getPeople();

      setLoading(false);
      setPeople(fetchedData);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    const indexedPeople = people.map((person, index) => {
      return {
        ...person,
        index: index + 1,
      };
    });

    setNewPeople(indexedPeople);
  }, [people]);

  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            { isHomePage && (
              <Route path="home" element={<Navigate to="/" replace />} />
            )}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/people"
              element={
                loading ? (
                  <Loader />
                ) : (
                  <PeoplePage
                    newPeople={newPeople}
                    loading={loading}
                    isError={isError}
                  />
                )
              }
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
