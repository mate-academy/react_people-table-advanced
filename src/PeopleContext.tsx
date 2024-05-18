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
  generateCentury: (
    century: string,
  ) => { centuries: null } | { centuries: string[] };
  handleCenturyClick: (century: string) => void;
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
  cent: string[];
  sortByCentury: string[];
  setSortByCentury: React.Dispatch<React.SetStateAction<string[]>>;
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
  const sex = searchParams.get('sex') || 'all';
  const [selectedFilter, setSelectedFilter] = useState<Filter>(sex as Filter);
  const cent = searchParams.getAll('centuries');
  const [sortByCentury, setSortByCentury] = useState(cent);

  // const sexFlter = (sorted: Person[]) => {
  //   if (selectedFilter === 'female') {
  //     return sorted.filter(person => person.sex === 'f');
  //   }

  //   if (selectedFilter === 'male') {
  //     return sorted.filter(person => person.sex === 'm');
  //   }

  //   if (selectedFilter === 'all') {
  //     return sorted;
  //   }
  // };

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

      if (selectedFilter === 'all') {
        return sorted;
      }

      // sexFlter(sorted);

      return sorted;
    },
    [people, selectedFilter, sortOrder],
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

  const generateCentury = (century: string) => {
    if (century === 'all') {
      return { centuries: null };
    }

    return {
      centuries: sortByCentury.includes(century)
        ? sortByCentury
        : [...sortByCentury, century],
    };
  };

  const handleCenturyClick = (century: string) => {
    let updatedCenturies = sortByCentury.includes(century)
      ? sortByCentury.filter(item => item !== century)
      : [...sortByCentury, century];

    if (century === 'all') {
      updatedCenturies = [];
    }

    setSortByCentury(updatedCenturies);
  };

  // @-dev without this effect, sortedPeople don't go back to org
  useEffect(() => {
    setSortedPeople(sortPeople(sort as Sort));
    setSelectedFilter(sex as Filter);
  }, [sex, sort, sortOrder, sortPeople]);

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
        generateCentury,
        handleCenturyClick,
        cent,
        setSortByCentury,
        sortByCentury,
        selectedFilter,
        setSelectedFilter,
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
