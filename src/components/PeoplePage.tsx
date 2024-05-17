import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { findParents, preparePeople } from '../utils/helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [search] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = findParents(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(
    () => preparePeople(people, search),
    [people, search],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={preparedPeople}
                isLoading={isLoading}
                hasError={hasError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
