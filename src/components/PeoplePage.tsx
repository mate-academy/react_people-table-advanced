import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Outlet, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [data, setData] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    fetch('./api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка завантаження JSON');
        }

        return response.json();
      })
      .then(people => {
        let filteredPeople: Person[] = people;

        const query = searchParams.get('query')?.toLowerCase() || '';
        const sex = searchParams.get('sex');
        const centuries = searchParams.getAll('centuries');

        if (query) {
          filteredPeople = filteredPeople.filter(person =>
            person.name.toLowerCase().includes(query),
          );
        }

        if (sex) {
          filteredPeople = filteredPeople.filter(person => person.sex === sex);
        }

        if (centuries.length > 0) {
          filteredPeople = filteredPeople.filter(person => {
            const birthCentury = Math.ceil(person.born / 100).toString();
            const deathCentury = Math.ceil(person.died / 100).toString();

            return (
              centuries.includes(birthCentury) ||
              centuries.includes(deathCentury)
            );
          });
        }

        setData(filteredPeople);
        setError(null);
      })
      .catch(() => {
        setError('Something went wrong');
        setData([]);
      })
      .finally(() => setTimeout(() => setLoading(false), 500));
  }, [searchParams]);

  return (
    <main className="section" data-cy="app">
      <div className="container">
        <div className="block ">
          <Outlet />

          <div className="box table-container">
            {loading && <Loader data-cy="loader" />}

            {!loading && error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {!loading && !error && data?.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && !error && data && data.length > 0 && (
              <>
                <PeopleTable data={data} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
