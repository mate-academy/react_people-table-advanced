import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getVisiblePeople } from '../utils/getVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = getVisiblePeople(people, {
    query, centuries, sex, sort, order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isLoadingError && (
                <>
                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!!people.length && !visiblePeople.length && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                </>
              )}

              {!!visiblePeople.length && (
                <PeopleTable
                  people={people}
                  visiblePeople={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
