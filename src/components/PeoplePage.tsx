import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { useContext, useEffect } from 'react';
import { PeopleListContext } from '../store/PeopleContext';
import * as getPeopleList from '../api';
import { Outlet } from 'react-router-dom';

export const PeoplePage = () => {
  const { setPeopleList, currentState, dispatch, loader, setLoader } =
    useContext(PeopleListContext);

  useEffect(() => {
    getPeopleList
      .getPeople()
      .then(data => {
        if (data.length === 0) {
          dispatch({
            type: 'setAlarmMessage',
            message: 'There are no people on the server',
          });
        } else {
          setPeopleList(data);
        }
      })
      .catch(() =>
        dispatch({
          type: 'setErrorMessage',
          message: 'Something went wrong',
        }),
      )
      .finally(() => setLoader(false));
  }, [setLoader, setPeopleList, dispatch]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loader ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {currentState.error && (
                    <p data-cy="peopleLoadingError">{currentState.error}</p>
                  )}

                  {currentState.alarm && (
                    <p data-cy="noPeopleMessage">{currentState.alarm}</p>
                  )}

                  <Outlet />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
