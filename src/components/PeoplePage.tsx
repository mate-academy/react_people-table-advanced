import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, SetPeople] = useState<Person[]>([]);
  const [error, SetError] = useState<string | null>(null);
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    const LoadPeople = async () => {
      SetLoading(true);

      try {
        const data = await getPeople();

        SetPeople(data);
      } catch (err) {
        SetError('Something went wrong');
      } finally {
        SetLoading(false);
      }
    };

    LoadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!error && !loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
