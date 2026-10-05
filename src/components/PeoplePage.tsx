import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

function getVisiblePeople(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const query = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const isDescending = searchParams.get('order') === 'desc';

  const filteredPeople = people.filter(person => {
    const matchesQuery = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(name => (name || '').toLowerCase().includes(query));

    const matchesSex = !sex || person.sex === sex;

    const century = String(Math.ceil(person.born / 100));

    const matchesCentury =
      centuries.length === 0 || centuries.includes(century);

    return matchesQuery && matchesSex && matchesCentury;
  });

  if (!sort) {
    return filteredPeople;
  }

  return filteredPeople.sort((first, second) => {
    let comparison = 0;

    switch (sort) {
      case 'name':
      case 'sex':
        comparison = first[sort].localeCompare(second[sort]);
        break;

      case 'born':
      case 'died':
        comparison = first[sort] - second[sort];
        break;

      default:
        break;
    }

    return isDescending ? -comparison : comparison;
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let isActive = true;

    getPeople()
      .then(loadedPeople => {
        if (!isActive) {
          return;
        }

        const peopleWithParents = loadedPeople.map(person => ({
          ...person,
          mother: loadedPeople.find(
            candidate => candidate.name === person.motherName,
          ),
          father: loadedPeople.find(
            candidate => candidate.name === person.fatherName,
          ),
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => {
        if (isActive) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const visiblePeople = getVisiblePeople(people, searchParams);
  const hasPeople = !isLoading && !hasError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
