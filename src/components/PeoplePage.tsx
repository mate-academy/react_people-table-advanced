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
        const century = searchParams.getAll('centuries');

        if (query) {
          return data.name.toLowerCase().includes(query);
        }

        if (sex) {
          return data.sex === sex;
        }

        if (century.length > 0) {
          return century.includes(String(Math.ceil(Number(data.died) / 100)));
        }

        return true;
      })
      .sort((a, b) => {
        const sort = searchParams.get('sort');
        const directionBorn = searchParams.get('directionBorn');
        const directionSex = searchParams.get('directionSex');
        const directionName = searchParams.get('directionName');
        const directionDied = searchParams.get('directionDied');

        if (sort === 'died') {
          if (directionDied === 'asc') {
            return Number(a.died) - Number(b.died);
          } else {
            return Number(b.died) - Number(a.died);
          }
        } else if (sort === 'name') {
          if (directionName === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        } else if (sort === 'sex') {
          if (directionSex === 'asc') {
            return a.sex.localeCompare(b.sex);
          } else {
            return b.sex.localeCompare(a.sex);
          }
        } else if (sort === 'born') {
          if (directionBorn === 'asc') {
            return Number(a.born) - Number(b.born);
          } else {
            return Number(b.born) - Number(a.born);
          }
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
