import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { getSearchWith } from '../../utils/searchHelper';
import { getSortedPeople } from '../../utils/getSortedPeople';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('century');

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        setPeople(getPreparedPeople(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  const filteredPeople = getFilteredPeople(people, query, centuries, sex);
  const visiblePeople = getSortedPeople(filteredPeople, sort, order);

  const changeQuery = (input: string) => {
    setSearchParams(
      getSearchWith(searchParams, { query: input || null }),
    );
  };

  const isErrorMessageVisible = isLoaded && isError;
  const isNoPeopleMessageVisible = isLoaded && !isError && !people.length;
  const isPeopleTableVisible = isLoaded && !isError && people.length > 0;
  const isNoMatchMessageVisible = isLoaded && !isError && !visiblePeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                changeQuery={changeQuery}
                sex={sex}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!isLoaded && <Loader />}

              {isErrorMessageVisible && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleMessageVisible && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleTableVisible && (
                <PeopleTable
                  people={visiblePeople}
                  sort={sort}
                  order={order}
                />
              )}

              {isNoMatchMessageVisible && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
