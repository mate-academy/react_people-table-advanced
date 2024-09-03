import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [peopleUsed, setPeopleUsed] = useState<Person[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setPeopleUsed(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // console.log(`Sorting by: ${sortField}, Order: ${sortOrder}`);

    const sortedPeople = [...people];

    if (sortField) {
      sortedPeople.sort((a, b) => {
        const fieldA = a[sortField as keyof Person];
        const fieldB = b[sortField as keyof Person];

        if (fieldA && fieldB) {
          if (fieldA < fieldB) {
            return sortOrder === 'desc' ? 1 : -1;
          }

          if (fieldA > fieldB) {
            return sortOrder === 'desc' ? -1 : 1;
          }
        }

        return 0;
      });
    }

    setPeopleUsed(sortedPeople);
  }, [sortField, sortOrder]);

  console.log(peopleUsed);

  const handleSort = (field: string) => {
    const currentSortField = searchParams.get('sort');
    const currentSortOrder = searchParams.get('order');

    if (currentSortField === field) {
      if (currentSortOrder === 'asc') {
        setSearchParams({ sort: field, order: 'desc' });
      } else if (currentSortOrder === 'desc') {
        setSearchParams({});
      }
    } else {
      setSearchParams({ sort: field, order: 'asc' });
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length >= 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                people={people}
                setPeopleUsed={setPeopleUsed}
                peopleUsed={peopleUsed}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length <= 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}
              {!loading && (
                <PeopleTable people={peopleUsed} onSort={handleSort} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
