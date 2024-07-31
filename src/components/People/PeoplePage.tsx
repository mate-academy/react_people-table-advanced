import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoaded, setIsloaded] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsloaded(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {errorMessage && (
                    <p data-cy="peopleLoadingError">{errorMessage}</p>
                  )}

                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {/* <p>There are no people matching the current search criteria</p> */}

                  {!!people.length && <PeopleTable filteredPeople={people} />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
