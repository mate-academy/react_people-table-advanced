import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
type Props = {
  children: React.ReactNode;
};

type SortType = string | null;

type ContextType = {
  people: Person[];
  setPeople: (v: Person[]) => void;
  loader: boolean;
  errorFromServer: string;
  sortedPeople: (o: SortType, s: SortType) => Person[];
};

export const PeopleContext = React.createContext<ContextType>({
  people: [],
  setPeople: () => [],
  loader: false,
  errorFromServer: '',
  sortedPeople: () => [],
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState('');

  const sortedPeople = (sorts: SortType, orders: SortType): Person[] => {
    const sorted = people.sort((a, b) => {
      if ((sorts === 'name' || sorts === 'sex') && !orders) {
        return a[sorts].localeCompare(b[sorts]);
      } else if ((sorts === 'born' || sorts === 'died') && !orders) {
        return a[sorts] - b[sorts];
      } else if (sorts === 'name' || (sorts === 'sex' && orders)) {
        return b[sorts].localeCompare(a[sorts]);
      } else if ((sorts === 'born' || sorts === 'died') && orders) {
        return b[sorts] - a[sorts];
      } else {
        return 0;
      }
    });

    return sorted;
  };

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
    sortedPeople,
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
