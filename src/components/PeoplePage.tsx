/* eslint-disable max-len */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import React, { useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { ErrorComponent } from './ErrorComponent';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export enum ErrorMessages {
  BLANK = '',
  NO_PEOPLE = 'There are no people on the server',
  SOMETHING_WENT_WRONG = 'Something went wrong',
  NO_PEOPLE_MATCHING_CRITERIA = 'There are no people matching the current search criteria',
}

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<ErrorMessages>(ErrorMessages.BLANK);
  const [filteredPeople, setFilteredPeople] = React.useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        if (response.length === 0) {
          setError(ErrorMessages.NO_PEOPLE);
        }

        setFilteredPeople(prev => [...prev, ...response]);
        setIsLoading(false);
      })
      .catch(() => {
        setError(ErrorMessages.SOMETHING_WENT_WRONG);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort) {
      setFilteredPeople(prev => {
        return prev.sort((a, b) => {
          const aValue = a[sort.toLowerCase() as keyof Person];
          const bValue = b[sort.toLowerCase() as keyof Person];

          const isAString = typeof aValue === 'string';
          const isBString = typeof bValue === 'string';

          if (aValue == null || bValue == null) {
            return 0;
          }

          if (isAString && isBString) {
            if (order === 'desc') {
              return aValue.localeCompare(bValue);
            }

            return bValue.localeCompare(aValue);
          }

          if (order === 'desc') {
            return aValue > bValue ? -1 : 1;
          }

          return aValue > bValue ? 1 : -1;
        });
      });
    }
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <ErrorComponent message={error} />
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
