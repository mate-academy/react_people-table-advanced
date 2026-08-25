import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLocaleLowerCase().trim() || '';
  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const visiblePeople = people
    .filter(person => {
      if (query) {
        const matchesName = person.name.toLocaleLowerCase().includes(query);
        const matchesMother = person.motherName
          ?.toLocaleLowerCase()
          .includes(query);
        const matchesFather = person.fatherName
          ?.toLocaleLowerCase()
          .includes(query);

        if (!matchesName && !matchesFather && !matchesMother) {
          return false;
        }
      }

      if (sexFilter && person.sex !== sexFilter) {
        return false;
      }

      if (centuriesFilter.length > 0) {
        const century = String(Math.ceil(person.born / 100));

        if (!centuriesFilter.includes(century)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      let result = 0;

      if (sortField === 'name' || sortField === 'sex') {
        result = a[sortField].localeCompare(b[sortField]);
      } else if (sortField === 'born' || sortField === 'died') {
        result = a[sortField] - b[sortField];
      }

      return sortOrder === 'desc' ? -result : result;
    });

  const noMatches =
    !isLoading && !error && people.length > 0 && visiblePeople.length === 0;

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && !isLoading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
