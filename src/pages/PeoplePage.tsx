import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

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
      const queryToLowerCase = query.toLowerCase();

      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(queryToLowerCase) ||
          person.motherName?.toLowerCase().includes(queryToLowerCase) ||
          person.fatherName?.toLowerCase().includes(queryToLowerCase),
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
        let valueA = a[sort as keyof Person];
        let valueB = b[sort as keyof Person];

        if (valueA === null || valueA === undefined) {
          valueA = '';
        }

        if (valueB === null || valueB === undefined) {
          valueB = '';
        }

        if (valueA < valueB) {
          return order === 'desc' ? 1 : -1;
        }

        if (valueA > valueB) {
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
