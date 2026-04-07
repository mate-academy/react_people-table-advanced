import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoader(true);
      try {
        const response = await getPeople();

        setPeople(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoader(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {!isLoader && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoader && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && (
                <PeopleTable
                  people={people}
                  setVisiblePeople={setVisiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
