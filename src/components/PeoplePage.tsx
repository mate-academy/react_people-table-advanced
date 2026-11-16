import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const query = (searchParams.get('query') || '').trim().toLowerCase();
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries').map(Number);
    const sort = searchParams.get('sort');
    const isDesc = searchParams.get('order') === 'desc';

    const result = people.filter(person => {
      const matchesQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(query),
        );
      const matchesSex = !sex || person.sex === sex;
      const matchesCentury =
        !centuries.length || centuries.includes(Math.ceil(person.born / 100));

      return matchesQuery && matchesSex && matchesCentury;
    });

    if (sort === 'name' || sort === 'sex') {
      result.sort((a, b) => a[sort].localeCompare(b[sort]));
    } else if (sort === 'born' || sort === 'died') {
      result.sort((a, b) => a[sort] - b[sort]);
    }

    if (isDesc && sort) {
      result.reverse();
    }

    return result;
  }, [people, searchParams]);

  const isLoaded = !isLoading && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoaded && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && people.length > 0 && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} allPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
