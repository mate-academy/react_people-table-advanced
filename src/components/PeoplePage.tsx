import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Outlet, useSearchParams } from 'react-router-dom';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleByName, setPeopleByName] = useState<Map<string, Person>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century');
  const sortField = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  function updateQuery(value: string) {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (value === '') {
        params.delete('query');
      } else {
        params.set('query', value);
      }

      return params;
    });
  }

  function updateCenturies(values: string[]) {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.delete('century');

      values.forEach(value => {
        params.append('century', value);
      });

      return params;
    });
  }

  function toggleSort(field: string) {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      const currentSort = params.get('sort');
      const currentOrder = params.get('order');

      if (currentSort !== field) {
        params.set('sort', field);
        params.delete('order');

        return params;
      }

      if (currentSort === field && currentOrder === null) {
        params.set('order', 'desc');

        return params;
      }

      if (currentSort === field && currentOrder === 'desc') {
        params.delete('sort');
        params.delete('order');

        return params;
      }

      return params;
    });
  }

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(receivedPeople => {
        const peopleWithSlug = receivedPeople.map(person => ({
          ...person,
          slug: `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`,
        }));

        setPeople(peopleWithSlug);

        setPeopleByName(
          new Map(peopleWithSlug.map(p => [p.name.toLowerCase().trim(), p])),
        );

        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const normalizedQuery = query.toLowerCase();

  const filteredByQuery = query
    ? people.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          (person.fatherName || '').toLowerCase().includes(normalizedQuery) ||
          (person.motherName || '').toLowerCase().includes(normalizedQuery),
      )
    : people;

  let filteredByCentury = filteredByQuery;

  if (centuries.length > 0) {
    filteredByCentury = filteredByQuery.filter(person => {
      const c = Math.floor(person.born / 100) + 1;

      return centuries.includes(String(c));
    });
  }

  const finalPeople = [...filteredByCentury];

  if (sortField) {
    finalPeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      return Number(aValue) - Number(bValue);
    });

    if (order === 'desc') {
      finalPeople.reverse();
    }
  }

  const allCenturies = Array.from(
    new Set(people.map(p => Math.floor(p.born / 100) + 1)),
  ).sort((a, b) => a - b);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      <div className="columns">
        {!isLoading && !error && people.length > 0 && (
          <div className="column is-one-quarter">
            <NameFilter value={query} onChange={updateQuery} />
            <CenturyFilter
              centuries={centuries}
              onChange={updateCenturies}
              allCenturies={allCenturies}
            />
          </div>
        )}

        <div className="column">
          {!isLoading && !error && people.length > 0 && (
            <>
              <PeopleTable
                people={finalPeople}
                peopleByName={peopleByName}
                onSort={toggleSort}
                sortField={sortField}
                order={order}
              />

                <Outlet context={{ people, peopleByName }} />

            </>
          )}
        </div>
      </div>
    </>
  );
};
