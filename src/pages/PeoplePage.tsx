import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/filterPeople';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const visible = !isLoading && !isError;
  const getFilteredPeople = filterPeople(people, searchParams);

  useEffect(() => {
    setIsLoading(true);
    setIsError('');

    getPeople()
      .then(setPeople)
      .catch(() => setIsError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {visible && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {isError}
                </p>
              )}
              {!people?.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visible && !!getFilteredPeople.length && (
                <PeopleTable people={getFilteredPeople} />
              )}

              {!isLoading && !getFilteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
