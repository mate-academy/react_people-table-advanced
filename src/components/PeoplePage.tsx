import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
              {loading && <Loader />}
              {!loading && (
                <>
                  {hasError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}
                  {/* <p>There are no people matching the current search criteria</p> */}
                  {people.length === 0 && !hasError ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <PeopleTable people={people} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
