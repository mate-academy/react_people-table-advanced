import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { filterPeople } from '../services/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const filteredPeople = filterPeople(people, query, sex, centuries);

  useEffect(() => {
    setLoading(true);
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
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? <Loader /> : (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}
                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {people.length && !filteredPeople.length && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  {filteredPeople.length > 0 && (
                    <PeopleTable people={filteredPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
