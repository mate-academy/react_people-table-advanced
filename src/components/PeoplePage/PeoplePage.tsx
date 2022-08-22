import { FC, useContext } from 'react';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../PeopleContext';

export const PeoplePage: FC = () => {
  const { people, errorMessage } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
