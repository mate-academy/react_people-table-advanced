import { useEffect, useState } from 'react';

import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug?: string }>();

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex') || '';

  const filteredPeople = people
    .filter(person => {
      const fullName =
        `${person.name} ${person.fatherName ?? ''} ${person.motherName ?? ''}`.toLowerCase();
      const matchesQuery = query === '' || fullName.includes(query);

      const birthCentury = person.born
        ? Math.floor(person.born / 100) + 1
        : null;
      const matchesCentury =
        centuries.length === 0 ||
        (birthCentury !== null && centuries.includes(birthCentury));

      const matchesSex = sex === '' || person.sex === sex;

      return matchesQuery && matchesCentury && matchesSex;
    })
    .sort((a, b) => {
      if (!sort) {
        return 0;
      }

      const valueA = a[sort as keyof Person];
      const valueB = b[sort as keyof Person];

      if (valueA === null || valueA === undefined) {
        return 1;
      }

      if (valueB === null || valueB === undefined) {
        return -1;
      }

      const aVal = typeof valueA === 'string' ? valueA.toLowerCase() : valueA;
      const bVal = typeof valueB === 'string' ? valueB.toLowerCase() : valueB;

      if (aVal < bVal) {
        return order === 'desc' ? 1 : -1;
      }

      if (aVal > bVal) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });

  useEffect(() => {
    setLoading(true);

    const startTime = Date.now();

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch people');
        }

        return res.json();
      })
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(500 - elapsed, 0);

        setTimeout(() => setLoading(false), delay);
      });
  }, []);

  if (loading) {
    return (
      <div className="block">
        <div data-cy="loader">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="has-text-danger" data-cy="peopleLoadingError">
        Error: {error}
      </p>
    );
  }

  if (!loading && people.length === 0 && !error) {
    return <p data-cy="noPeopleMessage">No people found.</p>;
  }

  return (
    <>
      <h1 className="title mt-6">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              <PeopleTable people={filteredPeople} selectedSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
