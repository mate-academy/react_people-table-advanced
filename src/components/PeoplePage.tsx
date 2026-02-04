import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person, PersonWithRelations } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { usePeopleFilters } from '../hooks/usePeopleFilters';
import { filterAndSortPeople } from '../utils/peopleUtils';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    sexFilter,
    queryFilter,
    centuryFilter,
    setSexFilter,
    setQueryFilter,
    toggleCentury,
    clearCenturies,
    resetAll,
    sortKey,
    sortOrder,
  } = usePeopleFilters();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const peopleWithRelations: PersonWithRelations[] = React.useMemo(() => {
    const filteredAndSorted = filterAndSortPeople(
      people,
      { sexFilter, queryFilter, centuryFilter },
      sortKey,
      sortOrder,
    );

    return filteredAndSorted.map(person => ({
      ...person,
      mother: filteredAndSorted.find(p => p.name === person.motherName) || null,
      father: filteredAndSorted.find(p => p.name === person.fatherName) || null,
    }));
  }, [people, sexFilter, queryFilter, centuryFilter, sortKey, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people.length > 0 && (
              <PeopleFilters
                sexFilter={sexFilter}
                setSexFilter={setSexFilter}
                queryFilter={queryFilter}
                centuryFilter={centuryFilter}
                toggleCentury={toggleCentury}
                clearCenturies={clearCenturies}
                setQueryFilter={setQueryFilter}
                resetAll={resetAll}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!loading && people.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && !error && people.length > 0 && (
                <PeopleTable
                  people={peopleWithRelations}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
