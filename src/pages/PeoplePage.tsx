import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPeoples = async () => {
    try {
      const peoplesResponse = await getPeople();

      setPeoples(peoplesResponse);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeoples();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {/*<p>There are no people matching the current search criteria</p>*/}

              {!isLoading && !error && <PeopleTable peoples={peoples} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
