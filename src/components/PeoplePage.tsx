import { useState, useEffect } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [listOfPeople, setListOfPeople] = useState<Person[]>([]);

  const loadPeopleList = async () => {
    setIsLoading(true);

    try {
      const data = await getPeople();

      setListOfPeople(data);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeopleList();
  }, []);

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
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!listOfPeople.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {listOfPeople.length > 0 && !isLoading && !isError && (
                <PeopleTable listOfPeople={listOfPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
