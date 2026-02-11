import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable
        people={visiblePeople}
        loading={isLoading}
        isError={isError}
        totalPeople={people.length}
      />
    </>
  );
};
