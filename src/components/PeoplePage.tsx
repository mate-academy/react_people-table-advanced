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
  const [isError, setIsError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const activeSexFilter = useMemo(() => {
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
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let visible = [...people];

    if (sex) {
      switch (activeSexFilter) {
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
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          item.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      visible = visible.filter(item =>
        centuries.includes(Math.ceil(item.born / 100).toString()),
      );
    }

    return visible;
  }, [activeSexFilter, sex, query, centuries, people]);

  // const visiblePeople = visibleList();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && !isError && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters activeSexFilter={activeSexFilter} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && !isError && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isError && !isLoading && !!visiblePeople.length && (
                <PeopleTable people={people} visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
