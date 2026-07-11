import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(person =>
        [person.name, person.motherName, person.fatherName]
          .filter(Boolean)
          .some(value => (value as string).toLowerCase().includes(query)),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(String(Math.ceil(person.born / 100))),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'sex':
            return a.sex.localeCompare(b.sex);
          case 'born':
            return a.born - b.born;
          case 'died':
            return a.died - b.died;
          default:
            return 0;
        }
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [people, searchParams]);

  const showFilters = !isLoading && !hasError && people.length > 0;
  const showNoPeopleMessage = !isLoading && !hasError && people.length === 0;
  const showNoMatchMessage =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;
  const showTable = !isLoading && !hasError && visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showFilters && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatchMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
