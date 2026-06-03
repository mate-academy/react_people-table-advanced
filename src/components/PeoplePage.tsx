/* eslint-disable @typescript-eslint/indent */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(parent => parent.name === person.motherName),
    father: people.find(parent => parent.name === person.fatherName),
  }));
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loadedPeople => {
        setPeople(getPeopleWithParents(loadedPeople));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasPeople = useMemo(() => people.length > 0, [people]);

  const visiblePeople = useMemo(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.trim().toLowerCase() || '';
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    const filteredPeople = people.filter(person => {
      const matchesSex = !sex || person.sex === sex;
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query);
      const personCentury = Math.ceil(person.born / 100).toString();
      const matchesCentury =
        centuries.length === 0 || centuries.includes(personCentury);

      return matchesSex && matchesQuery && matchesCentury;
    });

    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((person1, person2) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = person1.name.localeCompare(person2.name);
          break;

        case 'sex':
          result = person1.sex.localeCompare(person2.sex);
          break;

        case 'born':
          result = person1.born - person2.born;
          break;

        case 'died':
          result = person1.died - person2.died;
          break;

        default:
          result = 0;
      }

      return order === 'desc' ? -result : result;
    });
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && !hasError && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p className="help is-danger" data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && !hasPeople && (
                <p className="help" data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !hasError &&
                hasPeople &&
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
