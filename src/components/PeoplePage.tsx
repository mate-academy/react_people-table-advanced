import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable, SortField } from './PeopleTable';

export const PeoplePage = () => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const query = searchParams.get('query')?.trim().toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort') as SortField | null;
    const isDescending = searchParams.get('order') === 'desc';

    const filtered = people.filter(person => {
      const matchesQuery = [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .some(name => name!.toLowerCase().includes(query));
      const matchesSex = !sex || person.sex === sex;
      const century = Math.ceil(person.born / 100).toString();
      const matchesCentury =
        centuries.length === 0 || centuries.includes(century);

      return matchesQuery && matchesSex && matchesCentury;
    });

    if (!sort) {
      return filtered;
    }

    return [...filtered].sort((personA, personB) => {
      const result =
        typeof personA[sort] === 'string'
          ? String(personA[sort]).localeCompare(String(personB[sort]))
          : Number(personA[sort]) - Number(personB[sort]);

      return isDescending ? -result : result;
    });
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}
        {!isLoading && hasError && (
          <p data-cy="peopleLoadingError">Something went wrong</p>
        )}
        {!isLoading && !hasError && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !hasError && people.length > 0 && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {visiblePeople.length > 0 ? (
                  <PeopleTable
                    people={visiblePeople}
                    allPeople={people}
                    selectedSlug={personSlug}
                  />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
