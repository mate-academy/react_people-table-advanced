import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const sex = searchParams.get('sex');

    const centuries = searchParams.getAll('centuries').map(Number);

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    let result = people.filter(person => {
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        (person.motherName || '').toLowerCase().includes(query) ||
        (person.fatherName || '').toLowerCase().includes(query);

      const matchesSex = !sex || person.sex === sex;

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(Math.ceil(person.born / 100));

      return matchesQuery && matchesCentury && matchesSex;
    });

    if (sort) {
      result = [...result].sort((a, b) => {
        const first = a[sort as keyof Person];
        const second = b[sort as keyof Person];

        if (first === second) {
          return 0;
        }

        if (first == null) {
          return 1;
        }

        if (second == null) {
          return -1;
        }

        const comparison =
          typeof first === 'string' && typeof second === 'string'
            ? first.localeCompare(second)
            : Number(first) - Number(second);

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, searchParams]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns">
        {people.length > 0 && !isLoading && !hasError && (
          <div className="column is-3">
            <PeopleFilters />
          </div>
        )}
        <div className="column">
          {people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={visiblePeople} allPeople={people} />
          )}
        </div>
      </div>
    </>
  );
};
