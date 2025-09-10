/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { useGetPeople } from '../hooks/useGetPeople';
import { useMemo } from 'react';

export const PeoplePage = () => {
  const { error, isLoading, people } = useGetPeople();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      if (query) {
        const matchesQuery =
          person.name.toLowerCase().includes(query) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(query)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(query));

        if (!matchesQuery) {
          return false;
        }
      }

      if (centuries.length > 0) {
        const birthCentury = Math.floor(person.born / 100) + 1;

        if (!centuries.includes(String(birthCentury))) {
          return false;
        }
      }

      if (sex && person.sex !== sex) {
        return false;
      }

      return true;
    });
  }, [people, query, centuries, sex]);

  const sortField = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  const sortedPeople = useMemo(() => {
    return [...filteredPeople].sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      const firstValue = a[sortField as keyof typeof a];
      const secondValue = b[sortField as keyof typeof b];

      if (firstValue === secondValue) {
        return 0;
      }

      if (typeof firstValue === 'number' && typeof secondValue === 'number') {
        return order === 'asc'
          ? firstValue - secondValue
          : secondValue - firstValue;
      }

      const firstStringValue = String(firstValue).toLowerCase();
      const secondStringValue = String(secondValue).toLowerCase();

      if (firstStringValue < secondStringValue) {
        return order === 'asc' ? -1 : 1;
      }

      if (firstStringValue > secondStringValue) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [filteredPeople, sortField, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !error &&
                people.length > 0 &&
                sortedPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {sortedPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
