import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useCallback, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getVisiblePeople } from '../utils/getVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedGender = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const visiblePeople = getVisiblePeople(
    people,
    query,
    selectedGender,
    selectedCenturies,
    currentSort,
    currentOrder,
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const queryFromInput = event.target.value.trimStart();
      const params = new URLSearchParams(searchParams);

      if (queryFromInput === '') {
        params.delete('query');
      } else {
        params.set('query', queryFromInput);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                handleQueryChange={handleQueryChange}
                selectedGender={selectedGender}
                selectedCenturies={selectedCenturies}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                {isError && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <PeopleTable
                  visiblePeople={visiblePeople}
                  currentSort={currentSort}
                  currentOrder={currentOrder}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
