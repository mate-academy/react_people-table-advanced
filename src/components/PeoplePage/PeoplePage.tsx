import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { getPreparedPeople } from '../../helpers/GetPreparedPeople';
// import { getPreparedPeople } from '../../helpers/GetPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const preparedPeople = getPreparedPeople(people);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {
            !isError && !isLoading && !!people.length && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )
          }
          <div className="column">
            <div className="box table-container">
              {
                isLoading && (
                  <Loader />
                )
              }

              {
                isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )
              }

              {
                !isError && !isLoading && !people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
              }

              {
                !isError && !isLoading && !!people.length && (
                  <PeopleTable people={preparedPeople} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
