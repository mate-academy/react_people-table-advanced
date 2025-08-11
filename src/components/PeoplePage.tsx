import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Outlet, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [originalPeople, setOriginalPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const showNoPeopleMessage =
    !loading &&
    !error &&
    filteredPeople.length === 0 &&
    searchParams.toString() === '';
  const showNoPeopleForSearch =
    !loading &&
    !error &&
    filteredPeople.length === 0 &&
    searchParams.toString() !== '';

  const sorting = (
    sort: string,
    order: string | null,
    result: Person[],
  ): Person[] => {
    switch (sort) {
      case 'sex':
        if (order) {
          return result.sort((a, b) => b.sex.localeCompare(a.sex));
        } else {
          return result.sort((a, b) => a.sex.localeCompare(b.sex));
        }

      case 'name':
        if (order) {
          return result.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          return result.sort((a, b) => a.name.localeCompare(b.name));
        }

      case 'born':
        if (order) {
          return result.sort((a, b) => +b.born - +a.born);
        } else {
          return result.sort((a, b) => +a.born - +b.born);
        }

      case 'died':
        if (order) {
          return result.sort((a, b) => +b.died - +a.died);
        } else {
          return result.sort((a, b) => +a.died - +b.died);
        }
    }

    return result;
  };

  useEffect(() => {
    setLoading(true);

    fetch('./api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка завантаження JSON');
        }

        return response.json();
      })
      .then((people: Person[]) => {
        setOriginalPeople(people);
        setError(null);
      })
      .catch(() => {
        setError('Something went wrong');
        setOriginalPeople([]);
      })
      .finally(() => setTimeout(() => setLoading(false), 300));
  }, []);

  useEffect(() => {
    let result = [...originalPeople];

    const query = searchParams.get('query')?.toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort) {
      result = sorting(sort, order, result);
    }

    if (query) {
      result = result.filter(person =>
        person.name.toLowerCase().includes(query),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const birthCentury = Math.ceil(person.born / 100).toString();
        const deathCentury = Math.ceil(person.died / 100).toString();

        return (
          centuries.includes(birthCentury) || centuries.includes(deathCentury)
        );
      });
    }

    setFilteredPeople(result);
  }, [searchParams, originalPeople]);

  return (
    <main className="section" data-cy="app">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!loading && <Outlet />}
            </div>

            <div className="column">
              <div className="box table-container">
                {loading && <Loader data-cy="loader" />}

                {!loading && error && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                )}

                {showNoPeopleMessage && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {showNoPeopleForSearch && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                {!loading && !error && filteredPeople.length > 0 && (
                  <PeopleTable data={filteredPeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
