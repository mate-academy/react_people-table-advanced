import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person, PersonSortableFields } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as PersonSortableFields) || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const getSortParams = useCallback(
    (sortBy: PersonSortableFields) => {
      if (sortBy === sort && !order) {
        return { sort: sortBy, order: 'desc' };
      }

      if (sortBy !== sort && !order) {
        return { sort: sortBy, order: null };
      }

      return { sort: null, order: null };
    },
    [sort, order],
  );

  const getSortedPeople = (
    folk: Person[],
    sortField: PersonSortableFields,
    orderName: string,
  ) => {
    if (!sortField) {
      return [...folk];
    }

    return [...folk].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return orderName
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return orderName ? valueB - valueA : valueA - valueB;
      }

      return 0;
    });
  };

  const sortedPeople = getSortedPeople(people, sort, order);

  const getVisiblePeople = (
    folk: Person[],
    gender: string,
    inputQuery: string,
    centuryParams: string[],
  ) => {
    let visible = [...folk];

    if (gender) {
      visible = visible.filter(person => person.sex === sex);
    }

    if (inputQuery) {
      visible = visible.filter(
        person =>
          person.name.toLowerCase().includes(inputQuery.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(inputQuery.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(inputQuery.toLowerCase()),
      );
    }

    if (centuryParams.length > 0) {
      visible = visible.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuryParams.includes(century);
      });
    }

    return visible;
  };

  const visiblePeople = getVisiblePeople(sortedPeople, sex, query, centuries);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {loading && <Loader />}

        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                sex={sex}
                query={query}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {people.length === 0 && !loading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && !loading && !errorMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && !loading && (
                <PeopleTable
                  sort={sort}
                  order={order}
                  people={people}
                  getSortParams={getSortParams}
                  searchParams={searchParams}
                  visiblePeople={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
