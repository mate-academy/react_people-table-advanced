// src/components/PeoplePage.tsx (new/inferred based on requirements)

import { useEffect, useState } from 'react';
import { getPeople } from '../api'; // Assuming this exists as per typical structure
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(loadedPeople => {
        setPeople(loadedPeople);
        setFilteredPeople(loadedPeople);
      })
      .catch(() => {
        setFilteredPeople([]);
      })
      .finally(() => setIsLoading(false));
  }, []); // Empty dependency array to fetch only once

  return (
    <div className="container">
      <h1 className="title">People</h1>

      <div className="columns">
        <div className="column is-one-quarter">
          <PeopleFilters
            people={people}
            setFilteredPeople={setFilteredPeople}
          />
        </div>
        <div className="column">
          {isLoading ? (
            <div className="loader" data-cy="loader">
              Loading...
            </div>
          ) : filteredPeople.length === 0 ? (
            <p data-cy="noDataMessage">No people found</p>
          ) : (
            <PeopleTable people={filteredPeople} allPeople={people} />
          )}
        </div>
      </div>
    </div>
  );
};
