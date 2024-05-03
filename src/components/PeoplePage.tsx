import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useContext, useEffect } from 'react';
import { DispatchContext, StateContex } from '../context/reducer';
import { SwithchError } from '../types/SwitchError';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { isLoading, message } = useContext(StateContex);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: 'setFetch' });

    getPeople()
      .then(peoples => {
        dispatch({ type: 'setSwitchError', message: SwithchError.Default });
        dispatch({ type: 'setPeople', payload: peoples });

        dispatch({ type: 'disableFetch' });

        if (!peoples.length) {
          dispatch({ type: 'setSwitchError', message: SwithchError.Empty });
        }

        return peoples;
      })
      .catch(() => {
        dispatch({ type: 'disableFetch' });
        dispatch({ type: 'setSwitchError', message: SwithchError.FetchError });
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : message === SwithchError.Empty ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : message === SwithchError.FetchError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : (
          <>
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  <PeopleTable />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
