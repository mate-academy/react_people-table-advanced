import { FC, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/people/PeopleTable';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PeopleFilters } from '../components/filters';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const isNotLoadingAndPeopleExists = !isLoading && !!people.length;
  const isLoadingAndNoError = isLoading && !errorMessage;
  const isNotLoadingAndNoError = !isLoading && !errorMessage;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isNotLoadingAndPeopleExists && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isLoadingAndNoError && <Loader />}

              {isNotLoadingAndNoError && (
                <>
                  {people.length ? (
                    <PeopleTable people={preparedPeople} />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
