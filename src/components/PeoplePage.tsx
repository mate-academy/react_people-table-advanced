import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const sex = searchParams.get('sex');

  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());

    const matchesSex = !sex || person.sex === sex;

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    let comparison = 0;

    if (sort === 'name' || sort === 'sex') {
      comparison = a[sort].localeCompare(b[sort]);
    }

    if (sort === 'born' || sort === 'died') {
      comparison = a[sort] - b[sort];
    }

    return order === 'desc' ? -comparison : comparison;
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                onQueryChange={value =>
                  setSearchParams(
                    getSearchWith(searchParams, { query: value || null }),
                  )
                }
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {loading && <Loader />}
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
    </div>
  );
};
