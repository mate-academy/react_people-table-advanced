import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilter/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const showLoadingError = !isLoading && isError;
  const showNoPeopleError = !isLoading && !isError && !people.length;
  const showTable = !isLoading && !isError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showTable && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {showLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {showNoPeopleError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showTable && <PeopleTable people={people} />}
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
