import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

const SomethingWentWrong: React.FC = () => (
  <p data-cy="peopleLoadingError" className="has-text-danger">
    Something went wrong
  </p>
);

const NoPeopleMessage: React.FC = () => (
  <p data-cy="noPeopleMessage">There are no people on the server</p>
);

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsFetched(true));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      {!isFetched ? (
        <Loader />
      ) : (
        <div className="box table-container">
          {hasError && <SomethingWentWrong />}
          {!people.length && <NoPeopleMessage />}

          <PeopleTable people={people} />
          <PeopleFilters />
        </div>
      )}
    </div>
  );
};
