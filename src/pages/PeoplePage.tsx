import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleContext } from '../stores/PeopleContext';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { SearchParams } from '../types/SearchParams';

export const PeoplePage = () => {
  const {
    people,
    isLoading,
    loadingError,
    filterPeople,
  } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.QUERY) || '';
  const sex = searchParams.get(SearchParams.SEX) || '';
  const centuries = searchParams.getAll(SearchParams.CENTURIES) || [];
  const sort = searchParams.get(SearchParams.SORT) || '';
  const order = searchParams.get(SearchParams.ORDER) || '';

  const filteredPeople = useMemo(() => {
    return filterPeople({
      query, sex, centuries, sort, order,
    });
  }, [people, query, centuries, sex, sort, order]);

  return (
    <div className="container">
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
              {isLoading && (
                <Loader />
              )}

              {loadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!isLoading && !loadingError && !people.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!filteredPeople.length && !isLoading) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
