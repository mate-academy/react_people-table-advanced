import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState } from 'react';
import { getPeople } from '../api';
import { useEffect } from 'react';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [list, setList] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(people => {
        setList(people);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : list.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <div className="columns">
            <div className="column">
              <PeopleTable list={list} />
            </div>
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
