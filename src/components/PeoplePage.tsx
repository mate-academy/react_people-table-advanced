import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { filterList } from '../utils/filterAndSort';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { personInfo } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];

  const filteredPeople = filterList(people, { sex, query, century });

  const errorReasons = !isLoading && errorMessage;
  const emptyData = !isLoading && !people.length;
  const existPeople = !isLoading && people.length !== 0;

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

              {errorReasons && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {emptyData && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {existPeople && (
                <PeopleTable personInfo={personInfo} people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
