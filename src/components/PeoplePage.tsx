import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const isLoaded= !isLoading && people.length > 0;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(result => {
        setPeople(result);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && people.length > 0 && (
                <PeopleFilters isLoaded={isLoaded} />
              )}
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading ? (
                  <Loader />
                ) : (
                  <PeopleTable
                    people={people}
                    selected={slug?.toString() || ''}
                  />
                )}

                {error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {people.length === 0 && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
