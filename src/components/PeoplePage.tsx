import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        <div className="column is-narrow">
          <PeopleFilters />
        </div>

        <div className="column">
          <PeopleTable people={people} />
        </div>
      </div>
    </>
  );
};
