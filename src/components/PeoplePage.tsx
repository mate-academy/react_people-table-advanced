import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';

export const PeoplePage = () => {
  const { people, loading, error } = useContext(PeopleContext);
  const peopleMap = new Map(people.map(p => [p.name, p]));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

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
              <PeopleTable people={people} peopleMap={peopleMap} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
