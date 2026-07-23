import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api/people';

import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // Фільтрація
  const filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (query) {
      const q = query.toLowerCase();
      const matchesName = person.name.toLowerCase().includes(q);
      const matchesMother = person.motherName
        ? person.motherName.toLowerCase().includes(q)
        : false;
      const matchesFather = person.fatherName
        ? person.fatherName.toLowerCase().includes(q)
        : false;

      if (!matchesName && !matchesMother && !matchesFather) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const personCentury = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(personCentury)) {
        return false;
      }
    }

    return true;
  });

  // Сортування
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
        result = 0;
    }

    return order === 'desc' ? -result : result;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {people.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : visiblePeople.length === 0 ? (
                  <p>There are no people matching the current search criteria</p>
                ) : (
                  <PeopleTable people={visiblePeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
