/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export type SortBy = 'name' | 'sex' | 'born' | 'died' | null;
export type Order = null | 'desc';

export const SortContext = createContext<{
  sort: SortBy;
  order: Order;
  sortPeople: (people: Person[]) => Person[];
}>({
  sort: null,
  order: null,
  sortPeople: () => [],
});

export const SortProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState<SortBy>(null);
  const [order, setOrder] = useState<Order>(null);

  useEffect(() => {
    setSort((searchParams.get('sort') as SortBy) || null);
    setOrder((searchParams.get('order') as Order) || null);
  }, [searchParams]);

  const sortPeople = (people: Person[]) => {
    if (sort === null) {
      return people;
    }

    if (sort === 'born' || sort === 'died') {
      return people.sort((a, b) => {
        if (order === 'desc') {
          return b[sort] - a[sort];
        }

        return a[sort] - b[sort];
      });
    }

    return people.sort((a, b) => {
      if (order === 'desc') {
        return b[sort].localeCompare(a[sort]);
      }

      return a[sort].localeCompare(b[sort]);
    });
  };

  return (
    <SortContext.Provider value={{ sort, order, sortPeople }}>
      {children}
    </SortContext.Provider>
  );
};
