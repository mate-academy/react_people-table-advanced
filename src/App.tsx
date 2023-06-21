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
import { FilterType } from './types/enum';
import { Loader } from './components/Loader';
import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [newPeople, setNewPeople] = useState<NewPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [sexFilter, setSexFilter] = useState(FilterType.All);
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname.endsWith('/home');

  const sexFilterHandler = (value: FilterType) => {
    setSexFilter(value);
  };

  const deleteQuery = () => {
    setQuery('');
    localStorage.setItem('query', '');
  };

  const fetchPeople = async () => {
    try {
      const fetchedData = await getPeople();

      setLoading(false);
      setPeople(fetchedData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error occurred:', error);
      setIsError(true);
    }
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('query');

    if (savedQuery) {
      setQuery(savedQuery);
    }

    fetchPeople();
  }, []);

  useEffect(() => {
    const updatedPeople = people.map((person, index) => {
      return {
        ...person,
        index: index + 1,
      };
    });

    setNewPeople(updatedPeople);
  }, [people]);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
          <Routes>
            {isHomePage && (
              <Route path="home" element={<Navigate to="/" replace />} />
            )}
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/people"
              element={
                loading ? (
                  <Loader />
                ) : (
                  <PeoplePage
                    people={newPeople}
                    loading={loading}
                    sexFilter={sexFilter}
                    sexFilterHandler={sexFilterHandler}
                    query={query}
                    setQuery={setQuery}
                    deleteQuery={deleteQuery}
                    isError={isError}
                  />
                )
              }
            >
              <Route
                path={`:${sexFilter}`}
                element={(
                  <PeoplePage
                    people={newPeople}
                    loading={loading}
                    sexFilter={sexFilter}
                    sexFilterHandler={sexFilterHandler}
                    query={query}
                    setQuery={setQuery}
                    deleteQuery={deleteQuery}
                    isError={isError}
                  />
                )}
              />
              <Route
                path={`:${query}`}
                element={(
                  <PeoplePage
                    people={newPeople}
                    loading={loading}
                    sexFilter={sexFilter}
                    sexFilterHandler={sexFilterHandler}
                    query={query}
                    setQuery={setQuery}
                    deleteQuery={deleteQuery}
                    isError={isError}
                  />
                )}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
