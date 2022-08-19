import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { FilterPanel } from '../FilterPanel';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        if (response.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }

        setPeople(response);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && (
        <div className="box">
          <Loader />
        </div>
      )}

      {hasError && (
        <div className="box">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      )}

      {isEmpty && (
        <div className="box">
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        </div>
      )}

      {people && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <FilterPanel />
            </div>
            <div className="column">
              <div className="box table-container">
                <PeopleTable people={people} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
