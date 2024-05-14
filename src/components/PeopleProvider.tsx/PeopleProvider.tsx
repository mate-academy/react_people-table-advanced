import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
type Props = {
  children: React.ReactNode;
};

type ContextType = {
  people: Person[];
  setPeople: (v: Person[]) => void;
  loader: boolean;
  errorFromServer: string;
};

export const PeopleContext = React.createContext<ContextType>({
  people: [],
  setPeople: () => [],
  loader: false,
  errorFromServer: '',
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState('');

  useEffect(() => {
    setErrorFromServer('');
    setLoader(true);
    const loadPersons = async () => {
      try {
        const persons = await getPeople();

        if (persons) {
          setPeople(persons);
        }
      } catch (error) {
        setErrorFromServer('Something went wrong');
        throw new Error('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    loadPersons();
  }, []);

  const peopleTools = {
    people,
    setPeople,
    loader,
    errorFromServer,
  };

  return (
    <PeopleContext.Provider value={peopleTools}>
      {children}
    </PeopleContext.Provider>
  );
};
