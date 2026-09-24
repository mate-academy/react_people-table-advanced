import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';

export const PeoplePage = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPerson(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="section">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!error && !isLoading && person.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {isLoading && <Loader />}
            {!error && !isLoading && person.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
            {!error && !isLoading && person.length > 0 && (
              <PeopleTable persons={person} />
            )}
            {/*
              <p>There are no people matching the current search criteria</p>
           */}
          </div>
        </div>
      </div>
    </div>
  );
};
