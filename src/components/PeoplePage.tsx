import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const query = searchParams.get('query')?.trim().toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    const filteredPeople = people.filter(person => {
      const matchesQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(query),
        );

      const matchesSex = !sex || person.sex === sex;

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(String(Math.floor(person.born / 100)));

      return matchesQuery && matchesSex && matchesCentury;
    });

    if (sort) {
      filteredPeople.sort((first, second) => {
        let result = 0;

        if (sort === 'name') {
          result = first.name.localeCompare(second.name);
        } else if (sort === 'sex') {
          result = first.sex.localeCompare(second.sex);
        } else if (sort === 'born') {
          result = first.born - second.born;
        } else if (sort === 'died') {
          result = first.died - second.died;
        }

        return order === 'desc' ? -result : result;
      });
    }

    return filteredPeople;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
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

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <>
                  {visiblePeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={visiblePeople} selectedSlug={slug} />
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
