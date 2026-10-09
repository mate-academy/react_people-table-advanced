import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = people.filter(person => {
    const matchesName =
      !query ||
      [person.name, person.motherName || '', person.fatherName || ''].some(
        name => name.toLowerCase().includes(query),
      );

    const matchesSex = !sex || person.sex === sex;

    const century = Math.ceil(person.born / 100);
    const matchesCentury =
      centuries.length === 0 || centuries.includes(String(century));

    return matchesName && matchesSex && matchesCentury;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && hasError && (
        <p data-cy="peopleLoadingError">Something went wrong</p>
      )}

      {!loading && !hasError && (
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
                  <p>
                    There are no people matching the current search criteria
                  </p>
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
