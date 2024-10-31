import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { useUpdateQuery } from '../utils/useUpdateQuery';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { updateQuery } = useUpdateQuery();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters updateQuery={updateQuery} />
            </div>

            <div className="column">
              <PeopleTable
                error={error}
                people={people}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
