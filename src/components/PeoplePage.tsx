import { useEffect, useState } from 'react';
import type { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  }

  const normalizedQuery = query.toLowerCase();

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(normalizedQuery) ||
      (person.motherName || '').toLowerCase().includes(normalizedQuery) ||
      (person.fatherName || '').toLowerCase().includes(normalizedQuery);

    const matchesSex = !sex || sex === person.sex;

    const century = Math.ceil(person.born / 100);

    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(century));

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filteredPeople];
  const direction = order === 'desc' ? -1 : 1;

  if (sort === 'name') {
    sortedPeople.sort((a, b) => a.name.localeCompare(b.name) * direction);
  }

  if (sort === 'sex') {
    sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex) * direction);
  }

  if (sort === 'born') {
    sortedPeople.sort((a, b) => (a.born - b.born) * direction);
  }

  if (sort === 'died') {
    sortedPeople.sort((a, b) => (a.died - b.died) * direction);
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
                onQueryChange={handleQueryChange}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {hasError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : null}
              {isLoading ? <Loader /> : null}

              {!isLoading &&
                !hasError &&
                (people.length > 0 ? (
                  <PeopleTable
                    people={sortedPeople}
                    allPeople={people}
                    sort={sort}
                    order={order}
                  />
                ) : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
