import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../utils/peopleContext';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (people.length === 0) {
      setLoading(true);
      getPeople()
        .then(data => {
          setPeople(data);
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    }
  }, [people.length, setPeople]);

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
              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {!loading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && !errorMessage && people.length > 0 && (
                <PeopleTable visiblePeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
