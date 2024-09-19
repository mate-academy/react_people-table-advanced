import { useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';

import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response))
      .catch(() => {
        setError('Something went wrong');
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
              <PeopleTable
                people={people}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
