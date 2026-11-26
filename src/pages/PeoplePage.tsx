import { useState, useEffect, useMemo } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { Outlet, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';

export function PeoplePage() {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setErrorMessage('');

    getPeople()
      .then(setPeoples)
      .catch(error => {
        const message = error instanceof Error ? error.message : String(error);

        setErrorMessage(message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filterPeople = useMemo(() => {
    const query = searchParams.get('query')?.trim().toLowerCase() || '';
    const sex = searchParams.get('sex') || '';
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort') || '';
    const desc = searchParams.get('order') === 'desc';

    const result = peoples.filter(person => {
      const matchesQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(query),
        );
      const matchesSex = !sex || person.sex === sex;
      const matchesCenturies =
        !centuries.length ||
        centuries.includes(Math.ceil(person.born / 100).toString());

      return matchesQuery && matchesSex && matchesCenturies;
    });

    if (sort === 'name' || sort === 'sex') {
      result.sort((left, right) => left[sort].localeCompare(right[sort]));
    } else if (sort === 'born' || sort === 'died') {
      result.sort((left, right) => left[sort] - right[sort]);
    }

    if (desc && sort) {
      result.reverse();
    }

    return result;
  }, [peoples, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !errorMessage && !peoples.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !errorMessage && peoples.length > 0 && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <div className="box table-container">
                <Outlet
                  context={{
                    peoples: filterPeople,
                    allPeoples: peoples,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
