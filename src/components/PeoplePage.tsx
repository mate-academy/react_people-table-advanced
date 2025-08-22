import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { DispatchContext, StateContext } from '../store';
import { useContext, useEffect } from 'react';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { loading, people, error } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: 'loadStart' });

    getPeople()
      .then(loadPeople => {
        dispatch({ type: 'loadSuccess', payload: loadPeople });
      })
      .catch(() => {
        dispatch({
          type: 'error',
          payload: 'Something went wrong',
        });
      });
  }, [dispatch]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? <Loader /> : <PeopleTable />}
              {error !== null && <p data-cy="peopleLoadingError">{error}</p>}
              {people.length === 0 && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
