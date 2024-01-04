import { useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { Table } from '../components/Table';
import { PeopleFilters } from '../components/PeopleFilters';
import { preparePeople } from '../utils/helpers';
import { Loader } from '../components/Loader';
import { usePeopleToDisplay } from '../utils/PeopleToDisplay';

export const People = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(preparePeople(peopleFromServer));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayPeople = usePeopleToDisplay(preparePeople(people));

  return (
    <>
      <h1 className="title">People Page</h1>

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {(!displayPeople.length && !isLoading) ? (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the search criteria
                  </p>
                ) : (
                  <Table
                    displayPeople={displayPeople}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
