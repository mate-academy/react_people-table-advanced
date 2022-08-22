import {
  createContext, FC, useEffect, useState,
} from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';

interface ContextProps {
  people: Person[],
  setPeople: (people: Person[]) => void,
  errorMessage: string,
}

export const PeopleContext = createContext<ContextProps>({
  people: [],
  setPeople: () => {},
  errorMessage: '',
});

export const PeopleProvider: FC = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(data => {
        const preparedPeople = data.map((person, _, arr) => ({
          ...person,
          mother: arr.find(mother => mother.name === person.motherName),
          father: arr.find(father => father.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(setErrorMessage);
  }, []);

  const contextValue = {
    people,
    setPeople,
    errorMessage,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
