import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Sex } from '../types/Sex';

type PeopleContextType = {
  filteredPeople: Person[];
  errorMessage: string;
  isLoading: boolean;
  setPeopleList: React.Dispatch<React.SetStateAction<Person[]>>;
  isPeopleEmpty: boolean;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  filteredPeople: [] as Person[],
  errorMessage: '',
  isLoading: false,
  setPeopleList: () => {},
  isPeopleEmpty: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPeopleEmpty, setIsPeopleEmpty] = useState<boolean>(false);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('sex') || Sex.All;
  const query = searchParams.get('query')?.toLocaleLowerCase() || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    if (pathname === '/people') {
      (async () => {
        setIsLoading(true);
        try {
          const people = await getPeople();

          if (!people.length) {
            setIsLoading(false);
            setIsPeopleEmpty(true);

            return;
          }

          const peopleWithParents = people.map(person => ({
            ...person,
            mother: people
              .find(p => person.motherName === p.name) || null,
            father: people
              .find(p => person.fatherName === p.name) || null,
          }));

          setPeopleList(peopleWithParents);
        } catch {
          setErrorMessage('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [pathname]);

  const getFilteredPeople = () => {
    let updatedState: Person[] = [];

    switch (gender) {
      case 'm':
        updatedState = peopleList.filter(person => person.sex !== 'f');
        break;

      case 'f':
        updatedState = peopleList.filter(person => person.sex !== 'm');
        break;

      default:
        updatedState = [...peopleList];
    }

    if (query) {
      updatedState = updatedState
        .filter(person => person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query));
    }

    if (centuries.length) {
      updatedState = updatedState
        .filter(person => {
          const personBorn = Math.ceil(person.born / 100).toString();

          return centuries.includes(personBorn);
        });
    }

    return updatedState;
  };

  const filteredPeople = getFilteredPeople();

  const value = {
    filteredPeople,
    errorMessage,
    isLoading,
    setPeopleList,
    isPeopleEmpty,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
