import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [originalPeoples, setOriginalPeoples] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(newPeoples => {
        if (!newPeoples.length) {
          setError('server');
        }

        setPeoples(newPeoples);
        setOriginalPeoples(newPeoples);
      })
      .catch(() => setError('Something'))
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    if (!peoples.length && !loader) {
      setError('Current search');
    } else {
      setError('');
    }
  }, [peoples, loader]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && (
              <PeopleFilters
                originalPeoples={originalPeoples}
                setPeoples={setPeoples}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {error === 'Something' && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!peoples.length && !loader && (
                <p>There are no people matching the current search criteria</p>
              )}

              {error === 'server' && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loader && !error && (
                <PeopleTable
                  peoples={peoples}
                  originalPeoples={originalPeoples}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
