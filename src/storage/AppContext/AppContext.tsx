import {
  createContext, useCallback, useEffect, useState,
} from 'react';
import { useSearchParams, SetURLSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';

type SortKey = keyof Person;

type AppContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  visiblePeople: Person[];
  setVisiblePeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  fetchPeople: () => Promise<void>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  sex: string;
  query: string;
  centuries: string[];
  sort: SortKey | '';
  order: string;
};

type Props = {
  children: React.ReactNode;
};

const defaultValues: AppContextType = {
  people: [],
  setPeople: () => {},
  visiblePeople: [],
  setVisiblePeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: '',
  setError: () => {},
  fetchPeople: async () => {},
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  sex: '',
  query: '',
  centuries: [],
  sort: '',
  order: '',
};

export const appContext = createContext<AppContextType>(defaultValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century');
  const sort = (searchParams.get('sort') as SortKey) || '';
  const order = searchParams.get('order') || '';

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getPeople();

      const peopleWithFamilyLinks: Person[] = response.map((person) => {
        const mother = response.find(
          (woman) => woman.name === person.motherName,
        );

        const father = response.find((man) => man.name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(peopleWithFamilyLinks);
      setVisiblePeople(peopleWithFamilyLinks);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  function filterPeopleBySex(array: Person[], arg: string) {
    let filteredArray: Person[] = [];

    filteredArray = array.filter((item) => item.sex === arg);

    return filteredArray;
  }

  function filterPeopleByQuery(array: Person[], arg: string) {
    let filteredArray: Person[] = [];

    filteredArray = array.filter((item) => {
      return (
        item.name.includes(arg)
        || item.fatherName?.includes(arg)
        || item.motherName?.includes(arg)
      );
    });

    return filteredArray;
  }

  function filterPeopleByCenturies(array: Person[], args: string[]) {
    let filteredArray: Person[] = [];

    filteredArray = array.filter((item) => {
      const bornCentuary = Math.floor(item.born / 100).toString();

      return args.includes(bornCentuary);
    });

    return filteredArray;
  }

  function personCompare(
    a: Person,
    b: Person,
    sortKey: SortKey,
    isDesc: boolean,
  ): number {
    const aValue = a[sortKey] ?? '';
    const bValue = b[sortKey] ?? '';

    if (aValue === bValue) {
      return 0;
    }

    if (isDesc) {
      return aValue > bValue ? -1 : 1;
    }

    return aValue < bValue ? -1 : 1;
  }

  function sortPeople(array: Person[], sortType: SortKey, isDesc: boolean) {
    return array.sort((a, b) => personCompare(a, b, sortType, isDesc));
  }

  useEffect(() => {
    let updatedPeople: Person[] = new Array(...people);

    if (sex) {
      updatedPeople = filterPeopleBySex(updatedPeople, sex);
    }

    if (query) {
      updatedPeople = filterPeopleByQuery(updatedPeople, query);
    }

    if (centuries.length) {
      updatedPeople = filterPeopleByCenturies(updatedPeople, centuries);
    }

    updatedPeople = sortPeople(updatedPeople, sort, !!order);

    setVisiblePeople(updatedPeople);
  }, [searchParams, people]);

  const state: AppContextType = {
    people,
    setPeople,
    visiblePeople,
    setVisiblePeople,
    isLoading,
    setIsLoading,
    error,
    setError,
    fetchPeople,
    searchParams,
    setSearchParams,
    sex,
    query,
    centuries,
    sort,
    order,
  };

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
