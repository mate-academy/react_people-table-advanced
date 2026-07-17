import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type SortField = 'name' | 'sex' | 'born' | 'died';

const isSortField = (value: string | null): value is SortField =>
  value === 'name' || value === 'sex' || value === 'born' || value === 'died';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loadedPeople => {
        const peopleByName = new Map(
          loadedPeople.map(person => [person.name, person]),
        );

        setPeople(
          loadedPeople.map(person => ({
            ...person,
            mother: person.motherName
              ? peopleByName.get(person.motherName)
              : undefined,
            father: person.fatherName
              ? peopleByName.get(person.fatherName)
              : undefined,
          })),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const query = (searchParams.get('query') || '').toLowerCase();
    const sex = searchParams.get('sex');
    const selectedCenturies = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const isDescending = searchParams.get('order') === 'desc';

    const filtered = people.filter(person => {
      const matchesSex = !sex || person.sex === sex;
      const matchesCentury =
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(String(Math.ceil(person.born / 100)));
      const matchesQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(value =>
          value?.toLowerCase().includes(query),
        );

      return matchesSex && matchesCentury && matchesQuery;
    });

    if (!isSortField(sort)) {
      return filtered;
    }

    return [...filtered].sort((personA, personB) => {
      const valueA = personA[sort];
      const valueB = personB[sort];
      const result =
        typeof valueA === 'string'
          ? valueA.localeCompare(String(valueB))
          : valueA - Number(valueB);

      return isDescending ? -result : result;
    });
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !hasError &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                </p>
                )}

              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
