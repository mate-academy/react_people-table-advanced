import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person, Sort } from '../types';

type SortOrder = 'asc' | 'desc';

interface UsePeopleSortingResult {
  sortType: Sort;
  sortOrder: SortOrder;
  setSortType: (sortType: Sort) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  sortedPeople: Person[];
}

export const usePeopleSorting = ( people: Person[] ): UsePeopleSortingResult => {
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState<Sort>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    const currentSortTypeInUrl = searchParams.get('sort') as Sort;
    const currentSortOrderInUrl = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    setSortType(currentSortTypeInUrl);
    if (currentSortTypeInUrl) {
      setSortOrder(currentSortOrderInUrl);
    } else {
      setSortOrder('asc');
    }
  }, [searchParams]);

  const sortedPeople = useMemo(() => {
    const newPeople = [...people];

    if (!sortType) {
      return newPeople;
    }

    newPeople.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      switch (sortType) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'sex':
          valA = a.sex;
          valB = b.sex;
          break;
        case 'born':
          valA = a.born;
          valB = b.born;
          break;
        case 'died':
          valA = a.died;
          valB = b.died;
          break;
        default:
          return 0;
      }

      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return newPeople;
  }, [people, sortType, sortOrder]);

  return {
    sortType,
    sortOrder,
    setSortType,
    setSortOrder,
    sortedPeople,
  };
}