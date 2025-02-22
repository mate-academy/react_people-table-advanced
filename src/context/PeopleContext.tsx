import React, { createContext, useContext, useState, useCallback } from 'react';
import { Person, SortBy } from '../types';
import { getPeople } from '../api';

interface PeopleContextType {
  people: Person[];
  error: boolean;
  loading: boolean;
  getAllPeople: () => void;
  filteredPeople: (
    people: Person[],
    query: string,
    sex: string,
    centuries: string[],
    sort: string,
    order: string,
  ) => Person[];
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const transformData = (data: Person[]) => {
    return data.map(person => {
      const mother = data.find(m => person.motherName === m.name);
      const father = data.find(f => person.fatherName === f.name);

      return { ...person, mother, father };
    });
  };

  const getAllPeople = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const data = await getPeople();

      setPeople(transformData(data));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredPeople = (
    peopleToUpdate: Person[],
    query: string,
    sex: string,
    centuries: string[],
    sort: string,
    order: string,
  ) => {
    let visiblePeople = [...peopleToUpdate];

    if (query) {
      visiblePeople = visiblePeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      visiblePeople = visiblePeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      visiblePeople = visiblePeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sort) {
      visiblePeople.sort((a, b) => {
        switch (sort) {
          case SortBy.Name:
          case SortBy.Sex:
            return a[sort].localeCompare(b[sort]);
          case SortBy.Born:
          case SortBy.Died:
            return a[sort] - b[sort];
          default:
            return 0;
        }
      });
    }

    if (order) {
      visiblePeople.reverse();
    }

    return visiblePeople;
  };

  const contextValues = {
    people,
    error,
    loading,
    getAllPeople,
    filteredPeople,
  };

  return (
    <PeopleContext.Provider value={contextValues}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within a PeopleProvider');
  }

  return context;
};
