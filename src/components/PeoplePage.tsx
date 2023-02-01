import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const visiblePeople = people;
  let visibleElement = null;

  const fetchPeople = () => {
    setLoading(true);
    getPeople().then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  switch (true) {
    case isLoading:
      visibleElement = <Loader />;
      break;

    case hasError:
      visibleElement = (
        <p data-cy="peopleLoadingError">
          Something went wrong
        </p>
      ); break;

    case people.length === 0:
      visibleElement = (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ); break;

    case visiblePeople.length === 0:
      visibleElement = (
        <p>There are no people matching the current search criteria</p>
      ); break;

    default: visibleElement = (
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>

        <div className="column">
          <div className="box table-container">
            <PeopleTable />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {visibleElement}
      </div>
    </>
  );
};
