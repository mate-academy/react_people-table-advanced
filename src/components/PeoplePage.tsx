import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const normalizedQuery = query.toLowerCase().trim();

  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');
  const isDesc = order === 'desc';

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !normalizedQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    const matchesSex = !sex || person.sex === sex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];

      if (aValue < bValue) {
        return isDesc ? 1 : -1;
      }

      if (aValue > bValue) {
        return isDesc ? -1 : 1;
      }

      return 0;
    });
  }

  function handleSort(field: SortField) {
    const isSameField = sort === field;

    if (!sort || !isSameField) {
      setSearchParams({ sort: field });

      return;
    }

    if (sort === field && !order) {
      setSearchParams({ sort: field, order: 'desc' });

      return;
    }

    setSearchParams({});
  }

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  sort={sort}
                  order={order}
                  onSort={handleSort}
                />
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                sortedPeople.length === 0 && <p>No matching people</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
