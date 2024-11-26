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

  // const searchParams = new URLSearchParams(useLocation().search);
  const sort = (searchParams.get('sort') as PersonSortableFields) || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  console.log(sex);
  const query = searchParams.get('query') || '';

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

  function getSortedPeople(
    people: Person[],
    sortField: PersonSortableFields,
    orderName: string,
  ) {
    if (!sortField) return [...people];

    return [...people].sort((a, b) => {
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
  }

  const sortedPeople = getSortedPeople(people, sort, order);

  function getVisiblePeople(people: Person[], sex: string, query?: string) {
    const visible = [...people];

    if (sex) {
      visible.filter(person => person.sex === sex);
    }

    return visible;
  }

  const visiblePeople = getVisiblePeople(sortedPeople, sex);

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

              <p>There are no people matching the current search criteria</p>

              {people.length > 0 && !loading && (
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
