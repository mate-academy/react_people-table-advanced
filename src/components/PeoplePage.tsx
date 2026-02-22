import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res);
      })
      .catch(() => setIsError(true));
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && (
              <PeopleFilters
                people={people}
                setFilteredPeople={setFilteredPeople}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {people.length <= 0 && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              <PeopleTable allPeople={people} people={filteredPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
