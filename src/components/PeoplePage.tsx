import { useState, useEffect } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex') ?? '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const normalizedQuery = query.toLowerCase();
  const visiblePeople = people.filter(person => {
    const personCentury = Math.ceil(person.born / 100);
    const matchesCentury =
      centuries.length === 0 || centuries.includes(personCentury.toString());
    const matchesSex = sex === '' || person.sex === sex;

    const matchesQuery =
      person.name.toLowerCase().includes(normalizedQuery) ||
      (person.motherName ?? '').toLowerCase().includes(normalizedQuery) ||
      (person.fatherName ?? '').toLowerCase().includes(normalizedQuery);

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...visiblePeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);

        case 'sex':
          return a.sex.localeCompare(b.sex);

        case 'born':
          return a.born - b.born;

        case 'died':
          return a.died - b.died;

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      sortedPeople.reverse();
    }
  }

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters query={query} sex={sex} centuries={centuries} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  sort={sort}
                  order={order}
                  allPeople={people}
                />
              )}
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && !hasError && people.length > 0 && (
                <>
                  {visiblePeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
