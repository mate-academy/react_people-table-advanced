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
          {isHomePage && <Navigate to="/" replace />}
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/people"
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
                  fetchPeople={fetchPeople}
                />
              )}
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
                    fetchPeople={fetchPeople}
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
                    fetchPeople={fetchPeople}
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
