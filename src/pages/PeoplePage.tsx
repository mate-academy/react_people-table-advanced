import React from 'react';
import { useLocation } from 'react-router-dom';

import { getPeople } from '../api';

import { usePeopleDispatch, usePeopleState } from '../store/PeopleContext';

import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { pathname } = useLocation();

  const { people, error, loading } = usePeopleState();
  const dispatch = usePeopleDispatch();

  React.useEffect(() => {
    const currentPath = pathname;
    const basePath = '/people';

    if (currentPath.startsWith(basePath)) {
      dispatch({
        type: 'SET_ERROR',
        payload: '',
      });
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });

      getPeople()
        // eslint-disable-next-line
        .then(people => {
          dispatch({
            type: 'SET_PEOPLE',
            payload: people,
          });

          dispatch({
            type: 'SET_LOADING',
            payload: false,
          });
        })
        .catch(() => {
          dispatch({
            type: 'SET_ERROR',
            payload: 'Something went wrong',
          });
        });
    }
  }, []);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="block box has-text-danger">
        {error}
      </p>
    );
  }

  if (!people.length && !loading) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

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
              <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <p>There are no people matching the current search criteria</p> */
}
