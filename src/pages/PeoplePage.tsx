import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isTableVisable = !isError && !isLoading && !!people.length;
  const isErrorVisable = isError && !isLoading;
  const isEmptyMassageVisable = !people.length && !isLoading;
  const isNoMatchPeople = !!people.length && !isLoading && !isError; //маю дописати і винести функціонал в utils

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters people={people} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorVisable && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isEmptyMassageVisable && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoMatchPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isTableVisable && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
