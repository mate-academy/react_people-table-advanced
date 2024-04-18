import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../../api';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPreperedPeople } from '../functions/getPreperedPeople';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(error => {
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

  const isNoPeopleOnServer = !people.length && !errorMessage && !loading;
  const isNoSearchResult =
    !getPreperedPeople(people, searchParams).length && !loading;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!loading && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader />}

                {errorMessage && (
                  <p data-cy="peopleLoadingError">{errorMessage}</p>
                )}

                {isNoPeopleOnServer && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {isNoSearchResult && !errorMessage && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                {!loading && !isNoSearchResult && (
                  <PeopleTable people={people} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
