import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PersonItem/PeopleFilters/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading
                ? (<Loader />)
                : (
                  <>
                    {errorMessage
                      ? (<p data-cy="peopleLoadingError">{errorMessage}</p>)
                      : (<PeopleTable people={people} />)}

                    {!people.length && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    <p>
                      There are no people matching the current search criteria
                    </p>
                  </>
                )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
