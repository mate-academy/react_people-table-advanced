import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { SexFilter } from './SexFilter';
import { Person } from '../../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('centuries');
    params.delete('sex');

    setSearchParams(params);
  };

  const visiblePeople = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase() || '';

    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    let result = people.filter(person => {
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query);

      const century = Math.ceil(person.born / 100);

      const matchesCentury =
        centuries.length === 0 || centuries.includes(String(century));

      const matchesSex = !sex || person.sex === sex;

      return matchesQuery && matchesCentury && matchesSex;
    });

    if (sort) {
      result = [...result].sort((personA, personB) => {
        if (sort === 'name' || sort === 'sex') {
          const valueA = personA[sort];
          const valueB = personB[sort];

          return valueA.localeCompare(valueB);
        }

        if (sort === 'born' || sort === 'died') {
          return personA[sort] - personB[sort];
        }

        return 0;
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        {!isLoading && !hasError && (
          <div className="column is-one-quarter">
            <NameFilter />

            <CenturyFilter />

            <SexFilter />

            <button
              type="button"
              className="button is-light"
              onClick={handleResetFilters}
            >
              Reset filters
            </button>
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}

            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !hasError && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !hasError && people.length > 0 && (
              <PeopleTable people={visiblePeople} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
