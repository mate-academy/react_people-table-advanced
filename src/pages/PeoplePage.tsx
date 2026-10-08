import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getVisiblePeople } from '../utils/peopleHelper';
import { getSortedPeople } from '../utils/sortHelper';
import { SortField } from '../types/SortField';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    return getSortedPeople(
      getVisiblePeople(people, searchParams),
      sort as SortField,
      order,
    );
  }, [people, searchParams, sort, order]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const hasPeople = people.length > 0;
  const isLoaded = !isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && hasPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isLoaded && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && hasPeople && visiblePeople.length === 0 && (
                <p data-cy="noMatchingPeople">
                  There are no people matching the current search criteria
                </p>
              )}

              {isLoaded && visiblePeople.length > 0 && (
                <PeopleTable people={people} visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
