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
  const [people, setPeople] = React.useState<Person[]>([]);
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

        setPeople(response);
        setFilteredPeople(response);
      })
      .catch(() => {
        setError(ErrorMessages.SOMETHING_WENT_WRONG);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleFilterPeopleByHeaders() {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort) {
      setFilteredPeople(prev => {
        return [...prev].sort((a, b) => {
          const aValue = a[sort.toLowerCase() as keyof Person];
          const bValue = b[sort.toLowerCase() as keyof Person];

          const isAString = typeof aValue === 'string';
          const isBString = typeof bValue === 'string';

          if (aValue == null || bValue == null) {
            return 0;
          }

          if (isAString && isBString) {
            if (order === 'desc') {
              return bValue.localeCompare(aValue);
            }

            return aValue.localeCompare(bValue);
          }

          if (order === 'desc') {
            return aValue > bValue ? -1 : 1;
          }

          return aValue > bValue ? 1 : -1;
        });
      });
    } else {
      setFilteredPeople(people);
    }
  }

  function handleFilterPeopleBySearch() {
    const query = searchParams.get('query');

    if (query) {
      setFilteredPeople(prev => {
        return [...prev].filter(
          person =>
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            (person.mother &&
              person.mother.name.toLowerCase().includes(query.toLowerCase())) ||
            (person.father &&
              person.father.name.toLowerCase().includes(query.toLowerCase())),
        );
      });
    }
  }

  function handleFilterPersonBySex() {
    const sex = searchParams.get('sex');

    if (sex) {
      setFilteredPeople(prev => {
        return [...prev].filter(person => person.sex === sex);
      });
    }
  }

  function handleFilterPeopleByCenturies() {
    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      setFilteredPeople(prev => {
        return [...prev].filter(person => {
          const birthCentury = Math.ceil(person.born / 100);

          return centuries.includes(birthCentury.toString());
        });
      });
    }
  }

  useEffect(() => {
    setFilteredPeople(people);
    handleFilterPeopleByHeaders();
    handleFilterPeopleBySearch();
    handleFilterPersonBySex();
    handleFilterPeopleByCenturies();

    switch (true) {
      case filteredPeople.length === 0:
        setError(ErrorMessages.NO_PEOPLE_MATCHING_CRITERIA);
        break;
      default:
        setError(ErrorMessages.BLANK);
    }
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
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
