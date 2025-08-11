import { useState } from 'react';

import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

import usePeople from './usePeople';
import { Person } from '../../types';

export const PeoplePage = () => {
  const { people, fetchState } = usePeople();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const onFilter = (filterPeople: Person[]) => {
    setFilteredPeople(filterPeople);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters people={people} onFilter={onFilter} />
          </div>
          <div className="column">
            <div className="box table-container">
              {fetchState === 'loading' ? (
                <Loader />
              ) : fetchState === 'fail' ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
              {!filteredPeople.length && fetchState !== 'loading' && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
