import { useEffect, useState } from 'react';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [resultPeopleArray, setResultPeopleArray] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  const noPeopleMessage = !people.length && !errorMessage && !isLoading;

  const noPeopleMatchingMessage =
    people.length > 0 && !resultPeopleArray.length && !errorMessage;

  const isPeopleTableVisible =
    people.length > 0 &&
    !errorMessage &&
    !isLoading &&
    !noPeopleMatchingMessage;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                setResultPeopleArray={setResultPeopleArray}
                people={people}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {noPeopleMatchingMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isPeopleTableVisible && (
                <PeopleTable
                  people={people}
                  resultPeopleArray={resultPeopleArray}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
