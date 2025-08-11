import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { FilterBySex } from '../types/FilterBySex';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const centuries = searchParams.getAll('centuries') || [];

  const actualSexFilter = useMemo(() => {
    if (sex === 'm') {
      return FilterBySex.MALE;
    } else if (sex === 'f') {
      return FilterBySex.FEMALE;
    } else {
      return FilterBySex.ALL;
    }
  }, [sex]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Unable to load people'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let visible = [...people];

    if (sex) {
      switch (actualSexFilter) {
        case FilterBySex.MALE:
          visible = visible.filter(person => person.sex === 'm');
          break;
        case FilterBySex.FEMALE:
          visible = visible.filter(person => person.sex === 'f');
          break;
        default:
          break;
      }
    }

    if (query) {
      visible = visible.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      visible = visible.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return visible;
  }, [actualSexFilter, sex, query, centuries, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && !error && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters activeSexFilter={actualSexFilter} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!isLoading && !error && people && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && !error && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && people && people.length > 0 && (
                <PeopleTable people={people} visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
