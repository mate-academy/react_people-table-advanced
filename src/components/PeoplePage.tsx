import { useEffect, useState, useContext } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { GlobalContext } from './GeneralContext';

export const PeoplePage = () => {
  const {
    people,
    setPeople,
    filteredPeople,
  } = useContext(GlobalContext);

  const [peopleLoading, setPeopleLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPeopleLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setPeopleLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!peopleLoading && !error && people && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {peopleLoading && <Loader /> }

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length !== 0 && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!peopleLoading && !error && (people.length === 0
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
                : filteredPeople.length !== 0
                && <PeopleTable />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
