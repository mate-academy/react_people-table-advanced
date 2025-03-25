import React, { useCallback, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  peoples: [] as Person[],
  loading: false,
  loadPeoples: async () => {},
  isDataReady: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peoples, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  const loadPeoples = useCallback(() => {
    setLoading(true);
    setPeople([]);
    setIsDataReady(false);

    return getPeople()
      .then(data => {
        const newData = [...data];
        const name: Record<string, Person> = {};

        newData.forEach(people => {
          name[people.name] = people;
        });

        const updatedData = newData.map(person => {
          const newPerson = { ...person };

          if (newPerson.motherName) {
            newPerson.mother = name[newPerson.motherName] || null;
          }

          if (newPerson.fatherName) {
            newPerson.father = name[newPerson.fatherName] || null;
          }

          return newPerson;
        });

        setPeople(updatedData);
        setIsDataReady(true);
      })
      .catch(() => {
        setIsDataReady(false);
        setPeople([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      peoples,
      loading,
      loadPeoples,
      isDataReady,
    }),
    [peoples, loading, isDataReady, loadPeoples],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
