import React from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type PeopleContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoalding: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  setPeople: () => {},
  error: false,
  setError: () => {},
  loading: false,
  setLoalding: () => {},
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [loading, setLoalding] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoalding(true);
    setError(false);
    getPeople()
      .then(fetchedPeople => {
        const peopleByName: { [key: string]: Person } = {};

        fetchedPeople.forEach(person => {
          peopleByName[person.name] = person;
        });

        const processedPeople = fetchedPeople.map(person => ({
          ...person,
          mother: person.motherName
            ? peopleByName[person.motherName]
            : undefined,
          father: person.fatherName
            ? peopleByName[person.fatherName]
            : undefined,
        }));

        setPeople(processedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoalding(false);
      });
  }, []);

  const ctxValue = {
    people,
    setPeople,
    loading,
    setLoalding,
    error,
    setError,
  };

  return (
    <PeopleContext.Provider value={ctxValue}>{children}</PeopleContext.Provider>
  );
};
