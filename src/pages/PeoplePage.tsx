import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { getPeople } from '../services/api';
import { PeopleFilters } from '../components/PeopleFilters';
import { SearchOptions } from '../types/SearchOptions';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchOptions.Sex);
  const query = searchParams.get(SearchOptions.Query);
  const centuries = searchParams.getAll(SearchOptions.Centuries);
  const sortField = searchParams.get(SearchOptions.Sort);
  const order = searchParams.get(SearchOptions.Order);

  const visiblePeople = getFilteredPeople(
    people,
    sex,
    query,
    centuries,
    sortField,
    order,
  );

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(getPreparedPeople(peopleFromServer));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isDisplayErrorMessage = isError && !isLoading;
  const isNoPeopleFromServer = !people.length && !isLoading && !isError;
  const isPeopleFromServer = !!people.length && !isError;
  const isNoMatchingPeople = !visiblePeople.length && !isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isDisplayErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleFromServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoMatchingPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {isPeopleFromServer && !isNoMatchingPeople && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
