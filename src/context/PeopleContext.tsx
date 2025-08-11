import React, { ReactNode, useEffect, useState } from 'react';
import { Person } from '../types';
import * as peopleApi from '../api';

export type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
};

const initialPeopleContext: PeopleContextType = {
  people: [],
  isLoading: false,
  hasError: false,
};

export const peopleContext =
  React.createContext<PeopleContextType>(initialPeopleContext);

type Props = {
  children: ReactNode;
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    peopleApi
      .getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = people.map(person => {
    const fatherPerson = people.find(
      father => father.name === person.fatherName,
    );
    const motherPerson = people.find(
      mother => mother.name === person.motherName,
    );

    return { ...person, father: fatherPerson, mother: motherPerson };
  });

  return (
    <peopleContext.Provider
      value={{ people: peopleWithParents, isLoading, hasError }}
    >
      {children}
    </peopleContext.Provider>
  );
};
