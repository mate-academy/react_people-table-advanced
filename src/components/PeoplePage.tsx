import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect } from 'react';
import { DispatchContext, StatesContext } from '../store/Store';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { isReady, hasLoadingErrorMsg, hasNoMatchMsg, hasNoPeopleMsg } =
    useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const messages = hasLoadingErrorMsg || hasNoMatchMsg || hasNoPeopleMsg;

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        if (peopleFromServer.length === 0) {
          dispatch({ type: 'setNoPeopleMsg', payload: true });
        }

        dispatch({ type: 'loadPeople', payload: peopleFromServer });
      })
      .catch(() =>
        dispatch({
          type: 'setLoadingErrorMsg',
          payload: true,
        }),
      )
      .finally(() => dispatch({ type: 'isReady', payload: true }));
  }, [dispatch]);

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
              {!isReady && <Loader />}
              {hasLoadingErrorMsg && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {isReady && hasNoPeopleMsg && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isReady && hasNoMatchMsg && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isReady && !messages && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
