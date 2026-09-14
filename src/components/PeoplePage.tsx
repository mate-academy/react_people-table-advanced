import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import PersonTable from './components/PersonTable';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDatabase] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [databaseFiltered, setDatabaseFiltered] = useState(database);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setDatabase(data);
        setDatabaseFiltered(database);
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  // search logic

  useEffect(() => {
    const newData = database
      .filter(data => {
        const query = searchParams.get('query')?.toLowerCase().trim();
        const sex = searchParams.get('sex');
        const century = searchParams.get('centuries');

        if (query) {
          return data.name.toLowerCase().includes(query);
        }

        if (sex) {
          return data.sex === sex;
        }

        if (century) {
          return Math.ceil(Number(data.died) / 100) === Number(century);
        }

        return true;
      })
      .sort((a, b) => {
        const sort = searchParams.get('sort');

        if (sort === 'died') {
          return Number(a.died) - Number(b.died);
        } else if (sort === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sort === 'sex') {
          return a.sex.localeCompare(b.sex);
        }

        return 0;
      });

    setDatabaseFiltered(newData);
  }, [searchParams, database]);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && database.length > 0 && <PeopleFilters />}
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
