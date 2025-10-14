import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './loader/Loader';
import { PeopleTable } from './PeopleTable';
import peopleData from '../public/api/people.json';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setPeople(peopleData);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && <p data-cy="peopleLoadingError">Something went wrong</p>}
              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
