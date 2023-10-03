import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { SearchField } from '../utils/SearchFiled';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getPreparedPeople } from '../utils/getPreparedPeople';

type Props = {
  people: Person[],
  setPeople: (newValue: Person[]) => void,
};

export const PeoplePage: React.FC<Props> = ({ setPeople, people }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchField.Sex);
  const query = searchParams.get(SearchField.Query);
  const centuries = searchParams.getAll(SearchField.Centuries);
  const sortField = searchParams.get(SearchField.Sort);
  const order = searchParams.get(SearchField.Order);

  const visiblePeople = getFilteredPeople(
    people,
    sex,
    query,
    centuries,
    sortField,
    order,
  );

  const isDisplayErrorMessage = hasError && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !hasError;
  const isPeopleOnServer = !!people.length && !hasError;

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    (async () => {
      try {
        const peopleFrom = await getPeople();
        const preparedPeople = getPreparedPeople(peopleFrom);

        setPeople(preparedPeople);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="block">
            <div className="box table-container">
              {isLoading && (<Loader />) }

              {isDisplayErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleOnServer && (
                <PeopleTable people={visiblePeople} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
