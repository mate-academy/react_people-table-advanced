import React, { useContext, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

type PeopleContextValues = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
};

export const PeopleContext = React.createContext({} as PeopleContextValues);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  const people = useContext(PeopleContext);

  return people;
}
