import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetch(
        'https://mate-academy.github.io/react_people-table/api/people.json',
        { method: 'GET' },
      )
        .then(respose => respose.json())
        .then(response => {
          setPeople(response);
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!error && !loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!loading && people.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
