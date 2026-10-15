import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import type { Person } from '../types/Person';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    const name = person.name.toLowerCase();
    const motherName = (person.motherName || '').toLowerCase();
    const fatherName = (person.fatherName || '').toLowerCase();

    const matchesQuery =
      name.includes(query) ||
      motherName.includes(query) ||
      fatherName.includes(query);

    const century = Math.ceil(person.born / 100);

    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(century));

    const matchesSex = !sex || person.sex === sex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                (visiblePeople.length > 0 ? (
                  <PeopleTable people={visiblePeople} allPeople={people} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
