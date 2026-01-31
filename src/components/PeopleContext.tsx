import React, { createContext, useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

type PeopleContextType = {
  peopleFromServer: Person[];
  setPeopleFromServer: (people: Person[]) => void;
  visiblePeople: Person[];
  setVisiblePeople: (people: Person[]) => void;
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query');
  const currentCenturies = searchParams.getAll('centuries');
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  useEffect(() => {
    const filter = [...peopleFromServer].filter(person => {
      switch (currentSex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return person;
      }
    });

    const filterTwo = [...filter].filter(person => {
      if (currentCenturies?.length === 0) {
        return person;
      }

      return currentCenturies?.includes(
        Math.ceil(person.born / 100).toString(),
      );
    });

    const filterThree = [...filterTwo].filter(person => {
      if (currentQuery?.length === 0 || currentQuery === null) {
        return person;
      }

      return (
        person.name
          .toLowerCase()
          .trim()
          .includes(currentQuery.toLowerCase().trim()) ||
        person
          .fatherName!.toLowerCase()
          .trim()
          .includes(currentQuery.toLowerCase().trim()) ||
        person
          .motherName!.toLowerCase()
          .trim()
          .includes(currentQuery.toLowerCase().trim())
      );
    });

    const sorted = [...filterThree].sort((a, b) => {
      switch (currentSort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

    setVisiblePeople(currentOrder === 'desc' ? sorted.reverse() : sorted);
  });

  return (
    <PeopleContext.Provider
      value={{
        peopleFromServer,
        setPeopleFromServer,
        visiblePeople,
        setVisiblePeople,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used within a PeopleProvider');
  }

  return context;
};
