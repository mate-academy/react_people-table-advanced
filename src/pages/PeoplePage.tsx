import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { usePeople } from '../store/PeopleContext';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const { people, setPeople } = usePeople();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const trueCondition = !isLoading && !error && people.length > 0;
  const noPeopleCondition = !people.length && !isLoading && !error;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {trueCondition && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeopleCondition && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {trueCondition && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
