import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../types/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get('query');
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const filteredPeople = getFilteredPeople(
    people,
    currentQuery,
    currentSex,
    currentCenturies,
  );

  let sortedPeople = filteredPeople;

  const key = currentSort as keyof Person;

  if (currentSort) {
    sortedPeople = [...sortedPeople].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      let orderingValue = 0;

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        orderingValue = valueA - valueB;
      } else {
        orderingValue = String(valueA).localeCompare(String(valueB));
      }

      return currentOrder === 'desc' ? orderingValue * -1 : orderingValue;
    });
  }

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(currentPeople => setPeople(currentPeople))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            <div className="columns">
              <div className="column">
                <div className="box table-container">
                  <PeopleTable people={sortedPeople} />
                </div>
              </div>

              <div className="column is-narrow">
                <div>
                  <PeopleFilters />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};