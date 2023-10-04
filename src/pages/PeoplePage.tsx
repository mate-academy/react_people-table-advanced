import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader, PeopleTable, PeopleFilters } from '../components';
import {
  ERRORS,
  getPeople,
  getPreparedPeople,
  getPeopleFilteredAndSorted,
} from '../utils';
import { Person, SearchParameters } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get(SearchParameters.Query) || '';
  const filterBySex = searchParams.get(SearchParameters.Sex) || '';
  const centuries = searchParams.getAll(SearchParameters.Centuries) || [];
  const sort = searchParams.get(SearchParameters.Sort) || '';
  const order = searchParams.get(SearchParameters.Order) || '';
  const firstRender = useRef(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPeople = async () => {
      try {
        const currentPeople = await getPeople();

        if (!currentPeople.length) {
          setErrorMessage(ERRORS.NO_PEOPLE_ERROR);
        }

        setPeople(getPreparedPeople(currentPeople));
      } catch (error) {
        setErrorMessage(ERRORS.DOWNLOAD_ERROR);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const visiblePeople = getPeopleFilteredAndSorted(
    filterBySex, query, centuries, sort, order, people,
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    if (!visiblePeople.length) {
      setErrorMessage(ERRORS.NO_PEOPLE_ON_SEARCH_ERROR);
    } else {
      setErrorMessage('');
    }
  }, [visiblePeople.length]);

  const canShowTable = !errorMessage && !!people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(canShowTable
          || errorMessage === ERRORS.NO_PEOPLE_ON_SEARCH_ERROR) && (
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
                <p
                  data-cy={errorMessage === ERRORS.DOWNLOAD_ERROR
                    ? 'peopleLoadingError'
                    : errorMessage === ERRORS.NO_PEOPLE_ERROR
                      && 'noPeopleMessage'}
                  className={classNames({
                    'has-text-danger': errorMessage === ERRORS.DOWNLOAD_ERROR,
                  })}
                >
                  {errorMessage}
                </p>
              )}

              {canShowTable && (
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
