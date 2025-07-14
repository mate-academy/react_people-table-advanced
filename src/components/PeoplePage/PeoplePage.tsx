import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[] | []>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || 'a';
  const query = searchParams.get('query') || '';
  const centuriesFromParams = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);

  const filterAndSortPeople = useCallback(
    (peopleData: Person[]): Person[] => {
      let filtered = [...peopleData];

      switch (sort) {
        case 'name':
          filtered.sort((a, b) =>
            order === 'desc'
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name),
          );
          break;
        case 'sex':
          filtered.sort((a, b) =>
            order === 'desc'
              ? b.sex.localeCompare(a.sex)
              : a.sex.localeCompare(b.sex),
          );
          break;
        case 'born':
          filtered.sort((a, b) =>
            order === 'desc' ? b.born - a.born : a.born - b.born,
          );
          break;
        case 'died':
          filtered.sort((a, b) =>
            order === 'desc' ? b.died - a.died : a.died - b.died,
          );
          break;
      }

      if (sex === 'm') {
        filtered = filtered.filter(person => person.sex === 'm');
      } else if (sex === 'f') {
        filtered = filtered.filter(person => person.sex === 'f');
      }

      if (centuriesFromParams.length > 0) {
        const centuryNumbers = centuriesFromParams.map(Number);

        filtered = filtered.filter(person => {
          const birthCentury = Math.ceil(person.born / 100);

          return centuryNumbers.includes(birthCentury);
        });
      }

      if (query) {
        filtered = filtered.filter(person =>
          person.name.toLowerCase().includes(query.toLowerCase()),
        );
      }

      return filtered;
    },
    [sort, order, sex, centuriesFromParams, query],
  );

  useEffect(() => {
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    if (people && people?.length > 0) {
      setFilteredPeople(filterAndSortPeople(people));
    }
  }, [sort, order, people, sex, centuriesFromParams, filterAndSortPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                query={query}
                centuriesFromParams={centuriesFromParams}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {people && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people && filteredPeople?.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!people ? (
                <Loader />
              ) : (
                <PeopleTable
                  sort={sort}
                  order={order}
                  filteredPeople={filteredPeople}
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
