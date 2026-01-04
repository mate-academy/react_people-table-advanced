import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../components/hooks/usePeople';
import { FilterEnum } from '../types/Filter';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { getVisiblePeople } from '../components/hooks/getVisiablePeople';

export const PeoplePage = () => {
  const { people, error, isLoading } = usePeople();
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.all);

  const filteredPeople = getVisiblePeople(people, searchParams);
  const hasNoMatchingPeople =
    !isLoading && !error && people.length > 0 && filteredPeople.length === 0;

  useEffect(() => {
    if (sex === 'm') {
      setFilter(FilterEnum.male);
    } else if (sex === 'f') {
      setFilter(FilterEnum.female);
    } else {
      setFilter(FilterEnum.all);
    }
  }, [sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              people={people}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && filteredPeople.length > 0 && (
                <>
                  <PeopleTable people={filteredPeople} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
