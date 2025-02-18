import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import * as peopleServer from '../../api';
import { useSearchParams } from 'react-router-dom';
import { usePeopleFilters } from '../../hooks/usePeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { query, sex, centuries } = usePeopleFilters();

  const currentCenturies = useMemo(() => centuries.map(Number), [centuries]);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    peopleServer
      .getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(
    () =>
      people.filter(person => {
        const lowerQuery = query.toLowerCase();

        const mathcesQuery =
          person.name.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery);

        const matchesSex = !sex || sex === person.sex;

        const personCentury = Math.ceil(person.born / 100);
        const matchesCentury =
          currentCenturies.length === 0 ||
          currentCenturies.includes(personCentury);

        return mathcesQuery && matchesSex && matchesCentury;
      }),
    [people, query, sex, currentCenturies],
  );

  const visiblePeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((person1, person2) => {
      let comparison = 0;

      switch (sort) {
        case 'name':
        case 'sex':
          comparison = person1[sort].localeCompare(person2[sort]);
          break;

        case 'born':
        case 'died':
          comparison = person1[sort] - person2[sort];
          break;

        default:
          return 0;
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && <p data-cy="peopleLoadingError">{error}</p>}
              {!isLoading && !people.length && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
