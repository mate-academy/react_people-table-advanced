/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const normalizedQuery = query.toLowerCase();

  const visiblePeople = people.filter(person => {
    const matchesQuery =
      !normalizedQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesSex = !sex || person.sex === sex;

    const personCentury = Math.ceil(person.born / 100).toString();
    const matchesCentury =
      centuries.length === 0 || centuries.includes(personCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...visiblePeople].sort((person1, person2) => {
    if (!sort) {
      return 0;
    }

    let result = 0;

    switch (sort as SortField) {
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

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !hasError &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
