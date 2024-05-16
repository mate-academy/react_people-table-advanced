import { FC } from 'react';
import { Loader } from '../Loader';
import { PeopleProvider, usePeople } from '../../providers/PeopleProvider';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage: FC = () => {
  const { people, pending, error } = usePeople();

  return (
    <PeopleProvider>
      <div className="block">
        <h1 className="title">People Page</h1>
        <div className="box table-container">
          <PeopleFilters />
          {pending && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!pending && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!pending && !!people.length && <PeopleTable />}
        </div>
      </div>
    </PeopleProvider>
  );
};
