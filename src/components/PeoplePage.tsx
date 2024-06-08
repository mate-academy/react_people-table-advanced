import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { people } = state;

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(dataPeople => {
        dispatch({
          type: 'setPeople',
          payload: dataPeople,
        });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !error && !loading && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
