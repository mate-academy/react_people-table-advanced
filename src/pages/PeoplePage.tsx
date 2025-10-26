import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeopleState } from '../components/PeopleContext';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const PeoplePage = () => {
  const { people, isLoading, error } = usePeopleState();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const memoCenturies = useMemo(() => centuries, [centuries.join(',')]);

  const sortedPeople = useMemo(() => {
    return [...people].sort((a, b) => {
      const direction = order === 'asc' ? 1 : -1;

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name) * direction;
        case 'sex':
          return a.sex.localeCompare(b.sex) * direction;
        case 'born':
          return (a.born - b.born) * direction;
        case 'died':
          return (a.died - b.died) * direction;

        default:
          return 0;
      }
    });
  }, [people, sortBy, order]);

  const filteredPeople = useMemo(() => {
    return sortedPeople.filter(person => {
      const normQuery = query.toLocaleLowerCase();

      const isMatchName = [
        person.name,
        person.motherName,
        person.fatherName,
      ].some(val => val?.toLowerCase().includes(normQuery));

      const isMatchSex = !sex || person.sex === sex;

      const isMatchCenturies =
        memoCenturies.length === 0 ||
        memoCenturies.includes(String(Math.floor(person.born / 100) + 1));

      return isMatchName && isMatchSex && isMatchCenturies;
    });
  }, [query, sex, memoCenturies, sortedPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && people.length > 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
