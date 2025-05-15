import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { SortTypeValue } from '../types/SortTypeValue';
import { ContextType, PropsPeopleContext } from '../types/ContextType';

export const Context = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  error: false,
  setError: () => {},
  people: [],
  setPeople: () => {},
  visiblePeople: [],
});

export const PeopleContext: React.FC<PropsPeopleContext> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sorted = useCallback(
    (sortVal: SortTypeValue, arr: Person[]) => {
      return [...arr].sort((a: Person, b: Person) => {
        switch (sortVal) {
          case 'name':
            return order === 'desc'
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);
          case 'sex':
            return order === 'desc'
              ? b.sex.localeCompare(a.sex)
              : a.sex.localeCompare(b.sex);
          case 'born':
            return order === 'desc' ? b.born - a.born : a.born - b.born;
          case 'died':
            return order === 'desc' ? b.died - a.died : a.died - b.died;
          default:
            return 0;
        }
      });
    },
    [order],
  );

  const visiblePeople = useMemo(() => {
    let newPeople = [...people];

    if (centuries.length > 0) {
      newPeople = newPeople.filter(
        person =>
          centuries.includes(String(Math.ceil(person.born / 100))) ||
          centuries.includes(String(Math.ceil(person.died / 100))),
      );
    }

    if (sex) {
      newPeople = newPeople.filter(person => person.sex === sex);
    }

    if (query.length !== 0) {
      const normalizeQuery = query.toLowerCase().trim();

      newPeople = newPeople.filter(
        person =>
          person.name.toLowerCase().includes(normalizeQuery) ||
          person.motherName?.toLowerCase().includes(normalizeQuery) ||
          person.fatherName?.toLowerCase().includes(normalizeQuery),
      );
    }

    if (sort) {
      newPeople = sorted(sort as SortTypeValue, newPeople);
    }

    return newPeople;
  }, [centuries, sex, query, people, sort, sorted]);

  const data = {
    people,
    setPeople,
    error,
    setError,
    loading,
    setLoading,
    visiblePeople,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};
