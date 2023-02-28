import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { FC, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { preparePeople } from '../utils/preparePeople';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPeople = async () => {
    try {
      const allPeople = await getPeople();

      const preparedPeople = preparePeople(allPeople)

      setPeople(preparedPeople);
    } catch {
      setIsFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const emplyServer = !Boolean(people.length) && !isLoading && !isFetchError;
  const isVisiblePeopleTable = Boolean(people.length) && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
             {isVisiblePeopleTable && <PeopleFilters /> }
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isFetchError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {emplyServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isVisiblePeopleTable && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
