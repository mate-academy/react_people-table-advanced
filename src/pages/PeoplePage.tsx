import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    let filteredPeople = [...people];

    if (query) {
      const lowerQuery = query.toLowerCase();

      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(String(century));
      });
    }

    if (sort) {
      filteredPeople.sort((a, b) => {
        let aValue = a[sort as keyof Person];
        let bValue = b[sort as keyof Person];

        if (aValue === null || aValue === undefined) {
          aValue = '';
        }

        if (bValue === null || bValue === undefined) {
          bValue = '';
        }

        if (aValue < bValue) {
          return order === 'desc' ? 1 : -1;
        }

        if (aValue > bValue) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filteredPeople;
  }, [people, query, sex, centuries, sort, order]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable
        people={visiblePeople}
        loading={loading}
        error={error}
        totalPeople={people.length}
      />
    </>
  );
};
