import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoadError, setPeopleLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setPeopleLoadError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = getFilteredPeople(
    people,
    sex,
    query,
    centuries,
    sort,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {peopleLoadError && !isLoading && (
                <p data-cy="peopleLoadingError">{peopleLoadError}</p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length > 0 && !isLoading && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
