import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Loader,
  PeopleTable,
  PeopleFilters,
  ErrorNotification,
} from '../components';
import {
  ERRORS,
  getPeople,
  getSortedPeople,
  getFilteredPeople,
  getPreparedPeople,
} from '../utils';
import { Person, SearchParameters } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const query = searchParams.get(SearchParameters.Query) || '';
  const filterBySex = searchParams.get(SearchParameters.Sex) || '';
  const centuries = searchParams.getAll(SearchParameters.Centuries) || [];
  const sort = searchParams.get(SearchParameters.Sort) || '';
  const order = searchParams.get(SearchParameters.Order) || '';

  const filteredPeople = useCallback(() => getFilteredPeople(
    filterBySex, query, centuries, people,
  ), [filterBySex, query, centuries, people]);

  const visiblePeople = useMemo(() => {
    return getSortedPeople(sort, order, filteredPeople());
  }, [sort, order, filteredPeople]);

  const noPeopleOnSearchErrorCondition = !visiblePeople.length
  && isDataFetched && !errorMessage;

  const isTableVisible = !errorMessage && !!visiblePeople.length;

  const isFilterPanelVisible = isTableVisible
  || errorMessage === ERRORS.NO_PEOPLE_ON_SEARCH_ERROR;

  useEffect(() => {
    setIsLoading(true);
    const fetchPeople = async () => {
      try {
        const currentPeople = await getPeople();

        if (!currentPeople.length) {
          setErrorMessage(ERRORS.NO_PEOPLE_ERROR);
        }

        setPeople(getPreparedPeople(currentPeople));
        setIsDataFetched(true);
      } catch (error) {
        setErrorMessage(ERRORS.DOWNLOAD_ERROR);
        setIsDataFetched(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    if (noPeopleOnSearchErrorCondition) {
      setErrorMessage(ERRORS.NO_PEOPLE_ON_SEARCH_ERROR);
    } else if (errorMessage !== ERRORS.NO_PEOPLE_ERROR) {
      setErrorMessage('');
    }
  }, [visiblePeople.length, isDataFetched]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(isFilterPanelVisible) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                filterBySex={filterBySex}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <ErrorNotification errorMessage={errorMessage} />
              )}

              {isTableVisible && (
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
};
