import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { preparePeople } from '../utils/preparePeople';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isLoadingError, setIisLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[] | []>([]);

  const fetchPeople = async () => {
    try {
      let data = await getPeople();

      data = preparePeople(data);
      setPeople(data);
      setIsLoaderActive(false);
    } catch {
      setIisLoadingError(true);
    } finally {
      setIsLoaderActive(false);
    }
  };

  const peopleArrayIsEmpty = useMemo(() => {
    return people.length === 0 && !isLoaderActive;
  }, [people]);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoaderActive && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">

              {isLoaderActive && <Loader />}

              {isLoadingError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {people.length > 0 && (
                <PeopleTable people={people} />
              )}

              {peopleArrayIsEmpty && (
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
