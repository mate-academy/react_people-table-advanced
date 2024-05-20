import React, { useCallback, useEffect, useState } from 'react';
import { Sort } from './enums/Sort';
import { Person } from './types';
import { SortOrder } from './enums/SortOrder';
import { useSearchParams } from 'react-router-dom';
import { Filter } from './types/Filter';

type Props = {
  children: React.ReactNode;
};

type PeopleContextProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
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
  selectedFilter: Filter;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>;
  sortByCentury: string[];
  setSortByCentury: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ContextPeople = React.createContext({} as PeopleContextProps);

export const PeopleContext: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || 'all';
  const centuriesArr = searchParams.getAll('centuries');
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';
  const urlQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(urlQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.org);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(sex as Filter);
  const [sortByCentury, setSortByCentury] = useState<string[]>(centuriesArr);

  const sortPeople = useCallback(
    (column: Sort): Person[] => {
      let sorted: Person[] = [];

      if (people !== null) {
        sorted = [...people];

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

      if (selectedFilter === 'female') {
        return sorted.filter(person => person.sex === 'f');
      }

      if (selectedFilter === 'male') {
        return sorted.filter(person => person.sex === 'm');
      }

      if (sortByCentury.length > 0) {
        const centuriesToString = sortByCentury.map(item => Number(item));

        sorted = sorted.filter(person =>
          centuriesToString.includes(Math.ceil(person.born / 100)),
        );
      }

      if (query) {
        sorted = sorted.filter(person =>
          Object.values(person).some(value =>
            value.toString().toLowerCase().includes(query.toLowerCase()),
          ),
        );
      }

      return sorted;
    },
    [people, query, selectedFilter, sortByCentury, sortOrder],
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

  useEffect(() => {
    setSortedPeople(sortPeople(sort as Sort));
    setSelectedFilter(sex as Filter);
  }, [sex, sort, sortOrder, sortPeople]);

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

  useEffect(() => {
    setSortedPeople(sortPeople(sort as Sort));
  }, [sortByCentury]);

  return (
    <ContextPeople.Provider
      value={{
        query,
        setQuery,
        people,
        setPeople,
        searchParams,
        order,
        sort,
        sortOrder,
        setSortOrder,
        sortPeople,
        sortedPeople,
        setSortedPeople,
        toggleSortOrder,
        handlerSortBy,
        isLoading,
        setIsLoading,
        err,
        setErr,
        selectedFilter,
        setSelectedFilter,
        sortByCentury,
        setSortByCentury,
      }}
    >
      {children}
    </ContextPeople.Provider>
  );
};
