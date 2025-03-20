import { Person } from '../types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  loading: false,
  loadPeople: async () => {},
  isDataLoaded: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const loadPeople = useCallback(async () => {
    setLoading(true);
    setPeople([]);

    try {
      const peopleFromServer = await getPeople();

      const copyPeople = [...peopleFromServer];
      const name: Record<string, Person> = {};

      copyPeople.forEach(person => {
        name[person.name] = person;
      });

      const updatedData = copyPeople.map(person => {
        const newPerson = { ...person };

        if (newPerson.motherName) {
          newPerson.mother = name[newPerson.motherName] || null;
        }

        if (newPerson.fatherName) {
          newPerson.father = name[newPerson.fatherName] || null;
        }

        return newPerson;
      });

      setIsDataLoaded(true);
      setPeople(updatedData);
    } catch (e) {
      setIsDataLoaded(false);
      setLoading(false);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      people,
      loading,
      loadPeople,
      isDataLoaded,
    }),
    [people, loading, loadPeople, isDataLoaded],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
