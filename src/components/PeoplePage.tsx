import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { findParents } from '../utils/findParents';
import { filter } from '../utils/filter';
import { sort } from '../utils/sort';

export const PeoplePage: React.FC = () => {
  const [isLoadingErr, setIsLoadingErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peoplesFromServer => {
        const newPeople = findParents(peoplesFromServer);

        setPeople(newPeople);
      })
      .catch(() => setIsLoadingErr(true))
      .finally(() => setIsLoading(false));
  }, []);

  let visiblePeople = filter(people, searchParams);

  visiblePeople = sort(visiblePeople, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoadingErr && !isLoading && people.length !== 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isLoadingErr && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoadingErr && !isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoadingErr && !isLoading && people.length !== 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
