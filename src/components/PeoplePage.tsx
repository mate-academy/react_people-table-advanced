import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const preparedData = data.map(p => {
          const mother = data.find(d => d.name === p.motherName);
          const father = data.find(d => d.name === p.fatherName);

          return {
            ...p,
            mother: mother || undefined,
            father: father || undefined,
          };
        });

        setPersons(preparedData);
      })
      .catch(err => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
        setErrorMessage('');
      });
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

              {!isLoading && (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}

                  {persons?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  <p>
                    There are no people matching the current search criteria
                  </p>

                  {persons && <PeopleTable persons={persons} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
