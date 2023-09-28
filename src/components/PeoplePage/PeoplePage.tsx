import { useContext, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleList } from '../PeopleList/PeopleList';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { getPreparedPeople } from '../../utils/peopleHelper';
import { PeopleContext } from '../../contexts/PeopleContext';

export const PeoplePage = () => {
  const { people, setPeople, visiblePeople } = useContext(PeopleContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(currentPeople => {
        setPeople(getPreparedPeople(currentPeople));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isSuccessRequest = !isLoading && !isError;
  const isFailRequest = isError && !isLoading;
  const isNoPeopleOnServer = !people.length && isSuccessRequest;

  const isNoVisiblePeople = !!people.length
    && !visiblePeople.length
    && isSuccessRequest;

  const isVisiblePeople = !!visiblePeople.length && isSuccessRequest;

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

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isFailRequest && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isVisiblePeople && (
                <PeopleList />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
