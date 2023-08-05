import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParent } from '../utils/getPeopleWithParent';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setProcessing(true);
    setError(false);

    getPeople()
      .then((fetchedPeople) => {
        setPeople(getPeopleWithParent(fetchedPeople));
      })
      .catch(() => setError(true))
      .finally(() => setProcessing(false));
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
              {processing && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {!processing && !people.length && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!processing && people.length && !error && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
