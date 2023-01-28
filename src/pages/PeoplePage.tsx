import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { getVisiblePeople } from '../helpers/getVisiblePeople';
import { getPreparedPeople } from '../helpers/getPreparedPeople';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      const preparedPeople = getPreparedPeople(loadedPeople);

      setPeople(preparedPeople);
      setIsDataLoaded(true);
    } catch (error) {
      setErrorMessage('Can\'t load people');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleQueryChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }, [query, searchParams]);

  const visiblePeople = useMemo(() => getVisiblePeople(
    people,
    sex,
    query,
    centuries,
    sort,
    order,
  ), [people, sex, query, centuries, sort, order]);

  const isLoadedPeopleExist = isDataLoaded && visiblePeople.length !== 0;
  const isLoadedPeopleNotExist = isDataLoaded && !people.length;
  const isFilteredPeopleNotExist = isDataLoaded && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
                onQueryChange={handleQueryChange}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isLoadedPeopleNotExist && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isFilteredPeopleNotExist && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isLoadedPeopleExist && (
                <PeopleTable
                  people={visiblePeople}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
