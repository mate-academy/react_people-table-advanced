import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person, Sex } from '../../types';
import { PeopleFilters } from '../../components/PeopleFilters';
import { filterPeople, preparePeople, sortPeople } from '../../utils/helpers';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const sexParam: string | null = searchParams.get('sex');
  const sex: Sex | null = sexParam !== null ? sexParam as Sex : null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response))
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  const preparedPeople = preparePeople(people);
  const filteredPeople = filterPeople(preparedPeople, sex, query, centuries);
  const sortedPeople = sortPeople(filteredPeople, sort, order);

  const isErrorVisible = isLoaded && isError;
  const isNoPeopleOnServer = isLoaded && !isError && people.length === 0;
  const isNoPeopleVisible = isLoaded
    && !isError
    && people.length > 0
    && sortedPeople.length === 0;
  const isPeopleTabVisible = isLoaded && !isError && sortedPeople.length > 0;
  const isFilterVisible = isNoPeopleVisible || isPeopleTabVisible;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isFilterVisible && (
              <PeopleFilters sex={sex} query={query} centuries={centuries} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!isLoaded && <Loader />}

              {isErrorVisible && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoPeopleVisible && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {isPeopleTabVisible && (
                <PeopleTable people={sortedPeople} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
