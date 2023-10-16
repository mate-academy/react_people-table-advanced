import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getfilteredPeople } from './HelperFunctions';

export const PeoplePage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sortField = searchParams.get('sortField') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const filteredPeople = getfilteredPeople(
    people,
    centuries,
    sex,
    query,
    sortField,
    sortOrder,
  );
  const NO_PEOPLE_CONDITION = !errorMessage && !people.length && !isLoading;
  const NO_MATCHING_PEOPLE_CONDITION = !errorMessage && !isLoading
    && !!people.length && !filteredPeople.length;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
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

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {NO_PEOPLE_CONDITION && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {NO_MATCHING_PEOPLE_CONDITION && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
