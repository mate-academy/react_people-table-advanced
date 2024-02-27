import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable people={people} slug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// There are no people matching the current search criteria
