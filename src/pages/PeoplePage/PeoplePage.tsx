import { useEffect, useState } from 'react';

import { addParent, getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(addParent(peopleFromServer));
        setFilteredPeople(addParent(peopleFromServer));
      })
      .catch(() => {
        setHasError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasErrorMessage = hasError && !isLoading;
  const hasNoPeopleOnServer = !people.length && !hasError && !isLoading;
  const hasNoMatchingPeople = !isLoading
  && !filteredPeople.length
  && !hasNoPeopleOnServer;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (<PeopleFilters />)}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {hasErrorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatchingPeople && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!!people.length && (
                <PeopleTable
                  people={people}
                  filteredPeople={filteredPeople}
                  setFilteredPeople={setFilteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
