import { FC, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoaded(false);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                people={people}
                setFilteredPeople={setFilteredPeople}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!isLoaded && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {isLoaded && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && !isError && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && !isError && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
