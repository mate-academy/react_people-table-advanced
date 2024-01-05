import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';
import { preparePeople } from '../utils/preparePeople';
import { SearchParams } from '../constants/searchParams';
import { TableKeys } from '../components/PeopleTable/PeopleTable.constants';

export const PeoplePage = () => {
  const {
    data: people, isLoading, isError, isSuccess,
  } = usePeople();

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const sort = searchParams.get(SearchParams.Sort) as TableKeys | null;
  const order = searchParams.get(SearchParams.Order);
  const centuries = useMemo(() => {
    return (searchParams.getAll('centuries') || []).map(Number);
  }, [searchParams]);

  const preparedPeople = useMemo(() => {
    return preparePeople(people || [], {
      sex, centuries, query, sort, order,
    });
  }, [people, sex, centuries, query, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isSuccess && !people?.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people?.length && !preparedPeople.length
                && (
                  <p>
                    There are no people matching
                    the current search criteria
                  </p>
                )}

              {!!people?.length && !!preparedPeople.length
                && <PeopleTable people={preparedPeople || []} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
