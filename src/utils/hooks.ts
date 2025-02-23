/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export function useLoadPeople(
  onError: (str: string) => void,
  setIsLoading: (value: boolean) => void,
) {
  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    onError('');
    getPeople()
      .then(data => {
        const peopleMap = new Map(data.map(person => [person.name, person]));

        const peopleWithParents = data.map(person => ({
          ...person,
          mother: person.motherName
            ? peopleMap.get(person.motherName)
            : undefined,
          father: person.fatherName
            ? peopleMap.get(person.fatherName)
            : undefined,
        }));

        setPeople(peopleWithParents);
      })
      .catch(error => {
        onError('Something went wrong');
        throw error;
      })
      .finally(() => setIsLoading(false));
  });

  return people;
}

export function useFilterPeople(peopleList: Person[] | null) {
  const [searchParams] = useSearchParams();

  const sortName = searchParams.get('sort') as keyof Person;
  const sortOrder = searchParams.get('order');
  const filterSex = searchParams.get('sex');
  const filterQuery = searchParams.get('query')?.toLowerCase() || '';
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);

  const filteredPeople = useMemo(() => {
    if (!peopleList) {
      return [];
    }

    return peopleList
      .filter(person => {
        const name = person.name.toLowerCase();
        const motherName = person.motherName?.toLowerCase() || '';
        const fatherName = person.fatherName?.toLowerCase() || '';

        const matchesQuery =
          name.includes(filterQuery) ||
          motherName.includes(filterQuery) ||
          fatherName.includes(filterQuery);

        const matchesSex = filterSex ? person.sex === filterSex : true;

        const matchesCentury = centuries.length
          ? centuries.includes(Math.ceil(person.born / 100).toString())
          : true;

        return matchesQuery && matchesSex && matchesCentury;
      })
      .sort((a, b) => {
        if (!sortName) {
          return 0;
        }

        const aValue = a[sortName];
        const bValue = b[sortName];

        let compareResult = 0;

        // Ensure aValue and bValue are either strings or numbers
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          compareResult = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          compareResult = aValue - bValue;
        } else {
          // Fallback if aValue or bValue are invalid types (null, undefined, etc.)
          compareResult = 0;
        }

        // Apply sorting direction: ascending or descending
        return sortOrder === 'desc' ? -compareResult : compareResult;
      });
  }, [peopleList, filterQuery, filterSex, centuries, sortName, sortOrder]);

  return filteredPeople;
}
