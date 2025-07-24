import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { CenturyFilter } from '../types/CenturyFilter';
import { SexFilter, FilterSexValues } from '../types/SexFilter';

interface ContextType {
  people: Person[] | null;
  setPeople: React.Dispatch<React.SetStateAction<Person[] | null>>;
  filteredPeople: Person[] | null;
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[] | null>>;
  sexFilter: string;
  setSexFilter: React.Dispatch<React.SetStateAction<string>>;
  centuryFilter: string[];
  setCenturyFilter: React.Dispatch<React.SetStateAction<string[]>>;
  isLoadingPeople: boolean;
  setIsLoadingPeople: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPeopleError: boolean;
  setFetchPeopleError: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(null);
  const [sexFilter, setSexFilter] = useState<SexFilter>(FilterSexValues.ALL);
  const [centuryFilter, setCenturyFilter] = useState<CenturyFilter[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState<boolean>(false);
  const [fetchPeopleError, setFetchPeopleError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoadingPeople(true);
    setFetchPeopleError(false);

    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
      })
      .catch(() => {
        setFetchPeopleError(true);
      })
      .finally(() => setIsLoadingPeople(false));
  }, []);

  useEffect(() => {
    if (people === null) {
      return;
    }

    const filterByCentury = (persons: Person[]): Person[] => {
      const centuryFiltersOn = [...centuryFilter];

      const newPersons = persons.filter(person => {
        const personBornCentury = Math.ceil(person.born / 100);

        return centuryFiltersOn.some(
          filter => filter === personBornCentury.toString(),
        );
      });

      return newPersons;
    };

    let newPeople = [...people];

    newPeople = people.filter(person => {
      const dataSearch =
        `${person.name} ${person.fatherName} ${person.motherName}`.toLowerCase();

      return dataSearch.includes(query.toLowerCase());
    });

    switch (sexFilter) {
      case FilterSexValues.ALL:
        break;
      case FilterSexValues.MALE:
        newPeople = newPeople.filter(
          person => FilterSexValues.MALE === person.sex,
        );
        break;
      case FilterSexValues.FEMALE:
        newPeople = newPeople.filter(
          person => FilterSexValues.FEMALE === person.sex,
        );
        break;
    }

    if (centuryFilter.length > 0) {
      newPeople = filterByCentury(newPeople);
    }

    setFilteredPeople(newPeople);
  }, [people, sexFilter, centuryFilter, query]);

  return (
    <Context.Provider
      value={{
        people,
        setPeople,
        filteredPeople,
        setFilteredPeople,
        sexFilter,
        setSexFilter,
        centuryFilter,
        setCenturyFilter,
        isLoadingPeople,
        setIsLoadingPeople,
        fetchPeopleError,
        setFetchPeopleError,
        query,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePeopleContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Failed to load context');
  }

  return context;
};
