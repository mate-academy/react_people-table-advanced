import { useEffect, useState } from 'react';
import { Person } from '../types';
import PeopleFilters from './PeopleFilters';
import Loader from './Loader/Loader';
import PeopleTable from './PeopleTable';
import { getPeople } from '../api';
import getNormalizedPeople from '../utils/getNormalizedPeople';

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const normalizedPeople = getNormalizedPeople(people);

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
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!loading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && people.length > 0 && (
                <PeopleTable people={normalizedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
