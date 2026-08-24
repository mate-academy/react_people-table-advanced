import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const matchesName = person.name.toLowerCase().includes(query);
      const matchesMother = person.motherName?.toLowerCase().includes(query);
      const matchesFather = person.fatherName?.toLowerCase().includes(query);

      if (!matchesName && !matchesMother && !matchesFather) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const century = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(century)) {
        return false;
      }
    }

    return true;
  });

  const visiblePeople = [...filteredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    let result = 0;

    switch (sort) {
      case 'name':
      case 'sex':
        result = a[sort].localeCompare(b[sort]);
        break;

      case 'born':
      case 'died':
        result = a[sort] - b[sort];
        break;

      default:
        break;
    }

    return order === 'desc' ? -result : result;
  });

  const showFilters = !isLoading && !isError;
  const showNoPeople = !isLoading && !isError && people.length === 0;
  const showNoMatches =
    !isLoading && !isError && people.length > 0 && visiblePeople.length === 0;
  const showTable = !isLoading && !isError && visiblePeople.length > 0;

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

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {showNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
