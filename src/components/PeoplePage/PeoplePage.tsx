import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';

import { Person } from '../../types';
import { FilterPeople } from '../../helper/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const visiblePeople = FilterPeople(people);

  const isPeopleEmpty = people.length === 0;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setPeopleLoadingError(true);
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
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {peopleLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && isPeopleEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isPeopleEmpty && (
                <PeopleTable people={people} visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
