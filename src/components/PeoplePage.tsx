import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

type Props = {
  isError: boolean,
  arePeoplePresent: boolean,
  isLoading: boolean,
  people: Person[],
};

export const PeoplePage: React.FC<Props> = ({
  isError,
  arePeoplePresent,
  isLoading,
  people,
}) => {
  const { peopleSlug = null } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                people={people}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!arePeoplePresent && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoading && (
                <Loader />
              )}
              {!isLoading && (
                <PeopleTable
                  people={people}
                  selectPeopleSlug={peopleSlug}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
