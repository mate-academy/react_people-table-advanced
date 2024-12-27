import { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPeopleData = async () => {
    try {
      const response = await fetch(
        'https://mate-academy.github.io/react_people-table/api/people.json',
      );

      const data = await response.json();

      setPeopleData(data);
    } catch {
      setError('Data loading error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeopleData();
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

              {peopleData.length === 0 && !isLoading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>
              {peopleData.length > 0 && !isLoading && !error && (
                <PeopleTable peopleData={peopleData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
