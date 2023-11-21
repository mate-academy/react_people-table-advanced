import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await getPeople();

      setPeople(data);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block flex-reverse">
        <div className="is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
        {isLoading ? <Loader /> : (
          <div className="box table-container">
            {(people.length === 0 && !isLoading) && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            {(people.length !== 0 && !isLoading)
          && <PeopleTable people={people} />}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
          </div>
        )}

      </div>
    </>
  );
};
