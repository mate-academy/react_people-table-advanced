import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { SortField } from '../types/SortField';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    const query = (searchParams.get('query') || '').toLowerCase();

    const sex = searchParams.get('sex');

    const selectedCenturies = searchParams.getAll('centuries');

    const sort = searchParams.get('sort') as SortField | null;

    const order = searchParams.get('order');

    const filteredPeople = people.filter(person => {
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query);

      const matchesSex = !sex || person.sex === sex;

      const personCentury = String(Math.ceil(person.born / 100));

      const matchesCentury =
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(personCentury);

      return matchesQuery && matchesSex && matchesCentury;
    });

    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((personA, personB) => {
      let result = 0;

      switch (sort) {
        case SortField.Name:
          result = personA.name.localeCompare(personB.name);
          break;

        case SortField.Sex:
          result = personA.sex.localeCompare(personB.sex);
          break;

        case SortField.Born:
          result = personA.born - personB.born;
          break;

        case SortField.Died:
          result = personA.died - personB.died;
          break;

        default:
          result = 0;
      }

      return order === 'desc' ? -result : result;
    });
  }, [people, searchParams]);

  const hasPeople = people.length > 0;
  const hasVisiblePeople = visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && hasPeople && (
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

              {!isLoading && !hasError && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && hasPeople && !hasVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && hasVisiblePeople && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
