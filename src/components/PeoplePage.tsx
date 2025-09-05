import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import React, { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getPeople();

        setPeople(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable people={people} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
