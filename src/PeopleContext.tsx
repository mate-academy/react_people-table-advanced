import React, { useCallback, useEffect, useState } from 'react';
import { Sort } from './enums/Sort';
import { Person } from './types';
import { SortOrder } from './enums/SortOrder';
import { useSearchParams } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};
type PeopleContextProps = {
  people: Person[] | null;
  setPeople: React.Dispatch<React.SetStateAction<Person[] | null>>;
  searchParams: URLSearchParams;
  order: string;
  sort: string;
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortPeople: (column: Sort) => Person[];
  sortedPeople: Person[];
  setSortedPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  toggleSortOrder: () => void;
  handlerSortBy: (SortBy: Sort) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  err: boolean;
  setErr: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ContextPeople = React.createContext({} as PeopleContextProps);

export const PeopleContext: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.org);

  const sortPeople = useCallback(
    (column: Sort): Person[] => {
      let sorted: Person[] = [];

      if (people !== null) {
        sorted = [...people];
        if (sortOrder === SortOrder.org && people !== null) {
          return people;
        }

        sorted?.sort((a, b) => {
          const columnA = a[column];
          const columnB = b[column];

          if (typeof columnA === 'string' && typeof columnB === 'string') {
            return sortOrder === SortOrder.asc
              ? columnA.localeCompare(columnB)
              : columnB.localeCompare(columnA);
          } else {
            return sortOrder === SortOrder.asc
              ? Number(columnA) - Number(columnB)
              : Number(columnB) - Number(columnA);
          }
        });
      }

      return sorted;
    },
    [people, sortOrder],
  );

  const [sortedPeople, setSortedPeople] = useState<Person[]>(
    sortPeople(sort as Sort),
  );

  const toggleSortOrder = () => {
    if (sort !== '' && order === '') {
      setSortOrder(SortOrder.asc);
    } else if (order === SortOrder.desc && sort) {
      setSortOrder(SortOrder.desc);
    } else if (sort === '' && order === '') {
      setSortOrder(SortOrder.org);
    }
  };

  const handlerSortBy = (SortBy: Sort) => {
    toggleSortOrder();
    setSortedPeople(sortPeople(SortBy));
  };

  // @-dev without this effect, sortedPeople don't go back to org
  useEffect(() => {
    setSortedPeople(sortPeople(sort as Sort));
  }, [sort, sortOrder, sortPeople]);

  // @-dev setSortOrder and handlerSortBy
  useEffect(() => {
    if (
      order === SortOrder.asc ||
      order === SortOrder.desc ||
      order === SortOrder.org
    ) {
      setSortOrder(order);
    }

    if (Object.values(Sort).includes(sort as Sort)) {
      handlerSortBy(sort as Sort);
    }

    toggleSortOrder();
  }, [order, sort, sortOrder, searchParams]);

  return (
    <ContextPeople.Provider
      value={{
        err,
        isLoading,
        setErr,
        setIsLoading,
        handlerSortBy,
        toggleSortOrder,
        setSortedPeople,
        sortedPeople,
        order,
        people,
        searchParams,
        setPeople,
        setSortOrder,
        sort,
        sortOrder,
        sortPeople,
      }}
    >
      {children}
    </ContextPeople.Provider>
  );
};
