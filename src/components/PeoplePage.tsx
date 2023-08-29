import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

type Props = {
  person: Person[]
  isLoading: boolean
};

export const PeoplePage: React.FC<Props> = ({ person, isLoading }) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {person.length && !isLoading ? (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          ) : null}
          <div className="column">
            <div className="box table-container">
              {!isLoading && !person.length && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              <PeopleTable
                person={person}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
