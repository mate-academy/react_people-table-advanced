import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoader(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoader && !!people.length && !isError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !isLoader && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoader && !!people.length && !isError && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
