import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PageTable/PeopleTable';
import { usePeople } from '../hooks/usePeople';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useState } from 'react';

export const PeoplePage = () => {
  const { people, isLoading, error } = usePeople();
  const [filteredPeople, setFilteredPeople] = useState(people);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setFilteredPeople(
      getFilteredPeople(people, {
        query: searchParams.get('query') || '',
        filter: {
          centuries: searchParams.getAll('centuries').map(item => +item) || [],
          sex: (searchParams.get('sex') as Person['sex']) || '',
        },
        sort: (searchParams.get('sort') as keyof Person) || '',
        order: searchParams.get('order') || '',
      }),
    );
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !isLoading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && !isLoading && !error && (
                <p>There are no people matching the current search criteria</p>
              )}

              {filteredPeople.length !== 0 && !isLoading && !error && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
