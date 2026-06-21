import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(data => {
        const linked = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(linked);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let filtered = [...people];

  if (query) {
    const q = query.toLowerCase();

    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        (p.motherName || '').toLowerCase().includes(q) ||
        (p.fatherName || '').toLowerCase().includes(q),
    );
  }

  if (sex) {
    filtered = filtered.filter(p => p.sex === sex);
  }

  if (centuries.length) {
    filtered = filtered.filter(p =>
      centuries.includes(String(Math.ceil(p.born / 100))),
    );
  }

  if (sort) {
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sort) {
        case 'name':
        case 'sex':
          comparison = a[sort].localeCompare(b[sort]);
          break;
        case 'born':
        case 'died':
          comparison = a[sort] - b[sort];
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }

  const noResults =
    !loading && !error && people.length > 0 && filtered.length === 0;
  const showTable = !loading && !error && filtered.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && <PeopleFilters />}

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

              {noResults && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={filtered} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
