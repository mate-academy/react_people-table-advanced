import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sortParams = searchParams.get('sort');
  const orderParams = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(dataFromServer => setPeople(dataFromServer))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const validCenturies = useMemo(
    () => centuries.filter(c => ['16', '17', '18', '19', '20'].includes(c)),
    [centuries],
  );

  const normalizedQuery = query?.toLowerCase().trim();

  const visiblePeople = useMemo(() => {
    const filtered = people.filter(person => {
      if ((sex === 'm' || sex === 'f') && person.sex !== sex) {
        return false;
      }

      if (validCenturies.length > 0) {
        const century = String(Math.ceil(person.born / 100));

        if (!validCenturies.includes(century)) {
          return false;
        }
      }

      if (normalizedQuery) {
        const nameMatch = person.name.toLowerCase().includes(normalizedQuery);

        const motherMatch = person.motherName
          ?.toLowerCase()
          .includes(normalizedQuery);

        const fatherMatch = person.fatherName
          ?.toLowerCase()
          .includes(normalizedQuery);

        if (!nameMatch && !motherMatch && !fatherMatch) {
          return false;
        }
      }

      return true;
    });

    if (sortParams) {
      filtered.sort((personA, personB) => {
        switch (sortParams) {
          case 'name':
            return personA.name.localeCompare(personB.name);
          case 'sex':
            return personA.sex.localeCompare(personB.sex);
          case 'born':
            return personA.born - personB.born;
          case 'died':
            return personA.died - personB.died;
          default:
            return 0;
        }
      });

      if (orderParams === 'desc') {
        filtered.reverse();
      }
    }

    return filtered;
  }, [people, sex, validCenturies, normalizedQuery, sortParams, orderParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!hasError && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
