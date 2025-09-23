// src/providers/PeopleProvider.tsx

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types';

interface PeopleContextType {
  people: Person[];
  filteredAndSortedPeople: Person[];
  isLoading: boolean;
  errorMessage: string;
  handleGenderChange: (gen: string) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCenturyChange: (number: number) => void;
  handleSort: (field: string) => void;
  clearCenturies: () => void;
  resetAll: () => void;
  sex: string;
  query: string;
  centuries: string[];
  sort: string | null;
  order: string | null;
  allCenturies: number[];
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const allCenturies = [16, 17, 18, 19, 20];

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    getPeople()
      .then((res: Person[]) => {
        setPeople(res);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  function normalized(data: string) {
    return data.toString().trim().toLowerCase();
  }

  function handleGenderChange(gen: string) {
    const params = new URLSearchParams(searchParams);
    if (!gen) {
      params.delete('sex');
    } else {
      params.set('sex', gen);
    }
    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;
    if (value.trim() === '' || !value.trim()) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }
    setSearchParams(params);
  }

  function handleCenturyChange(number: number) {
    const century = number.toString();
    const params = new URLSearchParams(searchParams);
    const newCentury = centuries.includes(century)
      ? centuries.filter((cen) => cen !== century)
      : [...centuries, century];
    params.delete('centuries');
    newCentury.forEach((cen) => params.append('centuries', cen));
    setSearchParams(params);
  }

  function handleSort(field: string) {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    const validField = field === 'name' || field === 'sex' || field === 'born' || field === 'died';
    const params = new URLSearchParams(searchParams);
    if (validField) {
      if (currentSort !== field) {
        params.set('sort', field);
        params.delete('order');
      } else if (!currentOrder) {
        params.set('order', 'desc');
      } else if (currentOrder === 'desc') {
        params.delete('sort');
        params.delete('order');
      }
    } else {
      params.delete('sort');
      params.delete('order');
    }
    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);
    params.delete('centuries');
    setSearchParams(params);
  }

  function resetAll() {
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
  }

  const filteredAndSortedPeople = useMemo(() => {
    const filtered = people.filter((person) => {
      if (sex && person.sex !== sex) {
        return false;
      }
      if (centuries.length > 0) {
        const c = Math.ceil(person.born / 100);
        if (!centuries.includes(`${c}`)) {
          return false;
        }
      }
      const normalizedQuery = normalized(query);
      if (normalizedQuery) {
        const nameMatch = normalized(person.name).includes(normalizedQuery);
        const motherMatch = person.motherName && normalized(person.motherName).includes(normalizedQuery);
        const fatherMatch = person.fatherName && normalized(person.fatherName).includes(normalizedQuery);
        if (!(nameMatch || motherMatch || fatherMatch)) {
          return false;
        }
      }
      return true;
    });
    return [...filtered].sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return order === 'desc'
            ? person2.name.localeCompare(person1.name)
            : person1.name.localeCompare(person2.name);
        case 'sex':
          return order === 'desc'
            ? person2.sex.localeCompare(person1.sex)
            : person1.sex.localeCompare(person2.sex);
        case 'born':
          return order === 'desc'
            ? person2.born - person1.born
            : person1.born - person2.born;
        case 'died':
          return order === 'desc'
            ? person2.died - person1.died
            : person1.died - person2.died;
        default:
          return 0;
      }
    });
  }, [people, sex, query, centuries, sort, order]);

  const value = {
    people,
    filteredAndSortedPeople,
    isLoading,
    errorMessage,
    handleGenderChange,
    handleQueryChange,
    handleCenturyChange,
    handleSort,
    clearCenturies,
    resetAll,
    sex,
    query,
    centuries,
    sort,
    order,
    allCenturies,
  };
  return <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>;
};

export const usePeople = () => {
  const context = useContext(PeopleContext);
  if (context === undefined) {
    throw new Error('usePeople must be used within a PeopleProvider');
  }
  return context;
};