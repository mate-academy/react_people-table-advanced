import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getPeople()
      .then(loadedPeople => setPeople(loadedPeople))
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns">
        <div className="column ">
          <div className="box table-container">
            {isLoading && <Loader />}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}
            {!isLoading && !error && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
            {!isLoading && !error && people.length > 0 && (
              <PeopleTable people={people} selectedSlug={slug} />
            )}
          </div>
        </div>

        {people.length > 0 && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}
      </div>
    </>
  );
};
