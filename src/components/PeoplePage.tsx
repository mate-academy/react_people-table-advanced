import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types/Person';
import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people.filter(person => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchesQuery =
      !normalizedQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesSex = !sex || person.sex === sex;
    const matchesCenturies =
      centuries.length === 0 ||
      centuries.some(
        century => Math.ceil(person.born / 100) === parseInt(century),
      );

    return matchesQuery && matchesSex && matchesCenturies;
  });

  if (sort) {
    visiblePeople.sort((personA, personB) => {
      switch (sort) {
        case 'name':
        case 'sex': {
          const valueA = personA[sort];
          const valueB = personB[sort];

          return order === 'desc'
            ? valueB.localeCompare(valueA)
            : valueA.localeCompare(valueB);
        }

        case 'born':
        case 'died': {
          const valueA = personA[sort];
          const valueB = personB[sort];

          return order === 'desc' ? valueB - valueA : valueA - valueB;
        }

        default:
          return 0;
      }
    });
  }

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && (
                <>
                  {people.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : visiblePeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={visiblePeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
