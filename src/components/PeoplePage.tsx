import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex') ?? null;
  const centuries = searchParams.getAll('centuries');

  const filtered = people.filter(person => {
    const matchesQuery =
      !query ||
      [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .some(s => s.toLowerCase().includes(query.toLowerCase()));
    const matchesSex = !sex || person.sex === sex;
    const personCentury = person.born
      ? String(Math.floor(person.born / 100) + 1)
      : null;
    const matchesCentury =
      centuries.length === 0 ||
      (personCentury && centuries.includes(personCentury));

    return matchesQuery && matchesSex && matchesCentury;
  });

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters people={people} />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!loading && people && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && people && filtered.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && people && <PeopleTable people={filtered} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
