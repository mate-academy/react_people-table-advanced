import { useEffect, useState } from 'react';

import { getPeople } from '../../api';
import { Person } from '../../types';

import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isNotLoadingAndPeopleExists = !isLoading && !!people.length;
  const isLoadingAndNoError = isLoading && !error;
  const isNotLoadingAndNoError = !isLoading && !error;

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setError('');
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isNotLoadingAndPeopleExists && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {isLoadingAndNoError && <Loader />}

              {isNotLoadingAndNoError && (
                <>
                  {people.length ? (
                    <PeopleTable people={people} />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
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
