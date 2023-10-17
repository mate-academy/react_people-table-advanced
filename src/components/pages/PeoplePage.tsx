import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { usePeople } from '../../store/peopleContext';

export const PeoplePage = () => {
  const {
    people, loading, loadingError, filterPeople,
  } = usePeople();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const filteredPeople = useMemo(() => {
    return filterPeople({
      query, sex, centuries, sort, order,
    });
  }, [people, query, centuries, sex, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && (
                <Loader />
              )}

              {loadingError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {(people.length === 0 && !loadingError && !loading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && !loading && (
                <PeopleTable
                  people={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
