import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../../Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../../types';
import { getPeople } from '../../../api';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../../../utils/getFilteredPeople';
import { mapPeople } from '../../../utils/mapPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex');
  const sortBy = searchParams.get('sort');
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleFromServer: Person[]) => {
        const mappedPeople = mapPeople(peopleFromServer);

        setPeople(mappedPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return getFilteredPeople(people, {
      query,
      sexFilter,
      sortBy,
      centuries,
      order,
    });
  }, [centuries, query, sexFilter, sortBy, order, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !errorMessage && visiblePeople.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !isLoading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !errorMessage && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
