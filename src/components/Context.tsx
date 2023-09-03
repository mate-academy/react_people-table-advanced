import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export enum Sort {
  all = 'all',
  sex = 'sex',
  born = 'born',
  died = 'died',
  name = 'name',
}

export enum Filter {
  all = 'all',
  male = 'm',
  female = 'f',
  century = 'century',
}

interface ContextData {
  allPeople: Person[];
  setAllPeople: (a: Person[]) => void;
  filteredPeople: Person[];
  sort: Sort;
  setSort: (a: Sort) => void;
  isLoading: boolean;
  setIsLoading: (a: boolean) => void;
  setIsError: (a: boolean) => void;
  isError: boolean;
  selectedCenturies: number[];
  setSelectedCenturies: (a: number[]) => void;
  preperedPeople: Person[];
}

type Props = {
  children: React.ReactNode;
};

export const PeopleContext = createContext<ContextData>({
  allPeople: [],
  setAllPeople: () => { },
  filteredPeople: [],
  sort: Sort.all,
  setSort: () => { },
  isLoading: false,
  setIsLoading: () => { },
  setIsError: () => { },
  isError: false,
  selectedCenturies: [],
  setSelectedCenturies: () => { },
  preperedPeople: [],
});

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(allPeople);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [sort, setSort] = useState<Sort>(Sort.all);
  const [selectedCenturies, setSelectedCenturies] = useState<number[]>([]);

  const getParents = (peopleWithParrents: Person[]) => {
    const peopleWithParents = peopleWithParrents.map((person) => {
      const newPerson = { ...person };

      newPerson.father = peopleWithParrents.find(
        (father) => father.name === newPerson.fatherName,
      );

      newPerson.mother = peopleWithParrents.find(
        (mother) => mother.name === newPerson.motherName,
      );

      return newPerson;
    });

    return peopleWithParents;
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getPeople()
      .then((people) => {
        const preparedData = getParents(people);

        setAllPeople(preparedData);
        setFilteredPeople(preparedData);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const preperedPeople: Person[] = useMemo(() => {
    let people = allPeople;

    if (sex) {
      people = people.filter((person) => person.sex === sex);
    }

    if (query) {
      people = people.filter((person) => {
        const personName = person.name.toLowerCase();
        const fatherName = person.fatherName?.toLowerCase();
        const motherName = person.motherName?.toLowerCase();
        const normalQuery = query.toLowerCase();

        return (
          personName.includes(normalQuery)
          || fatherName?.includes(normalQuery)
          || motherName?.includes(normalQuery)
        );
      });
    }

    if (centuries.length > 0) {
      people = people.filter(
        (person) => centuries.find(
          (century) => Math.ceil(person.born / 100) === +century,
        ),
      );
    }

    const sortBy = searchParams.get('sort');
    const order = searchParams.get('order');

    switch (sortBy) {
      case Sort.all:
        people = allPeople;
        break;
      case Sort.died:
      case Sort.born:
        people.sort((a, b) => a[sortBy] - b[sortBy]);
        break;

      case Sort.name:
      case Sort.sex:
        people.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        break;
      default:
        return people;
    }

    if (order) {
      people.reverse();
    }

    return people;
  }, [filteredPeople, searchParams]);

  const value = {
    allPeople,
    setAllPeople,
    setFilteredPeople,
    filteredPeople,
    sort,
    setSort,
    isLoading,
    setIsError,
    setIsLoading,
    isError,
    selectedCenturies,
    setSelectedCenturies,
    preperedPeople,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
