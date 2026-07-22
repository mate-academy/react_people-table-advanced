import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { filterPeople, sortPeople } from '../utils/peopleHelper';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const filtered = filterPeople(people, searchParams);
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    return sortPeople(
      filtered,
      sort as 'name' | 'sex' | 'born' | 'died' | null,
      order === 'desc' ? 'desc' : order === 'asc' ? 'asc' : null,
    );
  }, [people, searchParams]);

  const showFilters = !isLoading && !hasError && people.length > 0;
  const hasPeople = people.length > 0;
  const showNoPeopleMessage = !isLoading && !hasError && !hasPeople;
  const showNoMatchingPeople =
    !isLoading && !hasError && hasPeople && filteredPeople.length === 0;
  const shouldShowTable =
    !isLoading && !hasError && hasPeople && filteredPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showFilters && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {showNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && hasPeople && showNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {shouldShowTable && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
