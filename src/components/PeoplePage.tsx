import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        const enriched = data.map(person => ({
          ...person,
          mother: data.find(p => p.name === person.motherName),
          father: data.find(p => p.name === person.fatherName),
        }));

        setPeople(enriched);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = people.filter(person => {
    const lowerQuery = query.toLowerCase();
    const matchesQuery =
      person.name.toLowerCase().includes(lowerQuery) ||
      (person.motherName || '').toLowerCase().includes(lowerQuery) ||
      (person.fatherName || '').toLowerCase().includes(lowerQuery);

    const matchesSex = !sex || person.sex === sex;

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
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
    }

    return order === 'desc' ? -result : result;
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

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
