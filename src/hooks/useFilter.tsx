import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export function usePeopleFilters(peopleData: Person[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState(peopleData);

  const query: string = searchParams.get('query') || '';
  const selectedCenturies: string[] = searchParams.getAll('century');
  const sex: string | null = searchParams.get('sex');
  const sortField = searchParams.get('sort') as keyof Person | null;
  const sortOrder: string | null = searchParams.get('order');

  useEffect(() => {
    let people = [...peopleData];

    if (query) {
      const lowerQuery = query.toLowerCase();
      people = people.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (sex === 'm') {
      people = people.filter(person => person.sex === 'm');
    } else if (sex === 'f') {
      people = people.filter(person => person.sex === 'f');
    } else if (sex === 'all') {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete('sex');
      setSearchParams(updatedParams);
      people = people.filter(person => person);
    }

    if (selectedCenturies.length > 0) {
      const personCentury = (person: Person) => Math.ceil(person.born / 100);
      people = people.filter(person =>
        selectedCenturies.includes(personCentury(person).toString()),
      );
    }

    if (sortField) {
      people.sort((a: Person, b: Person) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
          if (aValue < bValue) return sortOrder === 'desc' ? 1 : -1;
          if (aValue > bValue) return sortOrder === 'desc' ? -1 : 1;
          return 0;
        }

        return 0;
      });
    }

    setFilteredPeople(people);
  }, [peopleData, searchParams]);

  const updateQuery = (newQuery: string) => {
    if (newQuery) {
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }
    setSearchParams(searchParams);
  };

  const updateSex = (newSex: string) => {
    if (newSex) {
      searchParams.set('sex', newSex);
    } else if (newSex === 'all') {
      searchParams.delete('sex');
    }
    setSearchParams(searchParams);
  };

  const toggleCentury = (century: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    const centuries = updatedParams.getAll('century');

    if (century === 'ALL') {
      updatedParams.delete('century');
      setSearchParams(updatedParams);
      return;
    }

    if (centuries.includes(century)) {
      const newCenturies = centuries.filter(c => c !== century);
      updatedParams.delete('century');
      newCenturies.forEach(c => updatedParams.append('century', c));
    } else {
      updatedParams.append('century', century);
    }

    setSearchParams(updatedParams);
  };

  const updateSort = (field: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    const currentSortField = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSortField !== field) {
      updatedParams.set('sort', field);
      updatedParams.delete('order');
    } else if (!currentOrder) {
      updatedParams.set('order', 'desc');
    } else if (currentOrder === 'desc') {
      updatedParams.delete('sort');
      updatedParams.delete('order');
    }

    setSearchParams(updatedParams);
  };

  function resetAllFilters() {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete('query');
    updatedParams.delete('sex');
    updatedParams.delete('century');
    setSearchParams(updatedParams);
  }

  return {
    filteredPeople,
    query,
    selectedCenturies,
    sortField,
    sortOrder,
    updateQuery,
    toggleCentury,
    updateSort,
    updateSex,
    resetAllFilters,
  };
}
