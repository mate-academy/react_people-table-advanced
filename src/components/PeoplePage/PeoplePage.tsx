import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';
import React from 'react';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);
    setTimeout(() => {
      fetch('/api/people.json')
        .then(resp => {
          if (!resp.ok) {
            throw new Error('SomethingWent Wrong');
          }

          return resp.json();
        })
        .then(data => {
          setPeople(data);
          setIsLoadingError(false);
        })
        .catch(() => setIsLoadingError(true))
        .finally(() => setIsLoading(false));
    }, 1000);
  }, []);

  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');
  const nameFilter = searchParams.get('name');

  const filteredPeople = people.filter(person => {
    if (sexFilter && sexFilter !== person.sex) {
      return false;
    }

    if (centuriesFilter.length > 0) {
      const birthCentury = Math.floor(person.born / 100) + 1;

      if (!centuriesFilter.includes(birthCentury.toString())) {
        return false;
      }
    }

    if (nameFilter) {
      const query = nameFilter.toLowerCase();

      const fullName =
        `${person.name} ${person.motherName || ''} ${person.fatherName || ''}`.toLowerCase();

      if (!fullName.includes(query)) {
        return false;
      }
    }

    return true;
  });

  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');
  const sortedPeople = [...filteredPeople];

  if (sortBy) {
    sortedPeople.sort((a, b) => {
      let aValue = a[sortBy as keyof Person];
      let bValue = b[sortBy as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();

        return order === 'desc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue && bValue) {
        if (aValue < bValue) {
          return order === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return order === 'desc' ? -1 : 1;
        }
      }

      return 0;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isLoadingError && people?.length !== 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isLoadingError && people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isLoadingError && sortedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isLoadingError && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
