import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import PersonTable from './components/PersonTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDatabase] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [databaseFiltered, setDatabaseFiltered] = useState(database);

  useEffect(() => {
    getPeople()
      .then(data => {
        setDatabase(data);
        setDatabaseFiltered(data);
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading && <Loader />}

                {error.length !== 0 && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!isLoading && error.length === 0 && database.length === 0 && (
                  <p data-cy="noPeopleMessage">There are no people</p>
                )}

                {!isLoading && database.length > 0 && (
                  <PersonTable databaseFiltered={databaseFiltered} />
                )}

                <p>There are no people matching the current search criteria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
