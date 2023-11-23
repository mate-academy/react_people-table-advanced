import React, { createContext, useEffect, useState } from 'react';
import { useSearchParams, SetURLSearchParams } from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types';

type Context = {
  people: Person[]
  findPersonFather: (people: Person[], person: Person) => string | undefined
  findPersonMother: (people: Person[], person: Person) => string | undefined
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsPageActive: React.Dispatch<React.SetStateAction<boolean>>
  error: string | null
  sex: string
  centuriesUrl: string[]
  searchParams: URLSearchParams
  query: string
  filterPeople: () => Person[]
  setSearchParams: SetURLSearchParams
};

type Props = {
  children: React.ReactNode
};

const initialTabContext: Context = {
  people: [],
  findPersonFather: () => undefined,
  findPersonMother: () => undefined,
  isLoading: false,
  setIsLoading: () => { },
  setIsPageActive: () => { },
  error: null,
  sex: '',
  centuriesUrl: [],
  searchParams: new URLSearchParams(),
  query: '',
  filterPeople: () => [],
  setSearchParams: () => {},
};

const findPersonFather = (people: Person[], person: Person) => {
  const father = people.find(p => p.name === person.fatherName);

  return father?.slug;
};

const findPersonMother = (people: Person[], person: Person) => {
  const mother = people.find(p => p.name === person.motherName);

  return mother?.slug;
};

const getCentury = (year: number) => {
  return (
    Math.ceil(year / 100).toString()
  );
};

export const PeopleContext = createContext<Context>(initialTabContext);

export const PeopleContent: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageActive, setIsPageActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuriesUrl = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const filterPeople = () => {
    let filteredPeople = people;

    if (query) {
      const queryLowerCase = query.toLowerCase();

      filteredPeople = filteredPeople
        .filter(person => person.name.toLowerCase().includes(queryLowerCase)
      || (person.fatherName && person.fatherName.toLowerCase()
        .includes(queryLowerCase))
      || (person.motherName && person.motherName.toLowerCase()
        .includes(queryLowerCase)));
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuriesUrl && centuriesUrl.length > 0) {
      filteredPeople = filteredPeople.filter(person => centuriesUrl
        .includes(getCentury(person.born)));
    }

    return filteredPeople;
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(usersFromServer => {
        setPeople(usersFromServer);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isPageActive]);

  return (
    <PeopleContext.Provider value={{
      people,
      findPersonFather,
      findPersonMother,
      isLoading,
      setIsLoading,
      setIsPageActive,
      error,
      sex,
      centuriesUrl,
      searchParams,
      query,
      filterPeople,
      setSearchParams,
    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
