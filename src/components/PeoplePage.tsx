import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const data = await getPeople();

      setPeople(data);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
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
                {loading && <Loader />}

                {errorMessage && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {errorMessage}
                  </p>
                )}

                {!loading && people.length === 0 && !errorMessage && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <p>There are no people matching the current search criteria</p>

                {!loading && people.length > 0 && (
                  <PeopleTable people={people} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
