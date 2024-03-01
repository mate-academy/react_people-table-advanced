import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Person } from './types';
import { filterAndSorting } from './utils/filter';
import { FiltersType } from './types/FiltersType';

interface PeopleContextProps {
  children: ReactNode;
}

type HandleFilterValue = string | boolean | string[];

interface PeopleContextValue {
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  setDataComes: (data: string) => void,
  setloading: React.Dispatch<React.SetStateAction<boolean>>,
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  setError: (err: boolean) => void,
  existingPerson: (Name: string | null) => Person | null | undefined,
  handleChangeFilter: (
    key: keyof FiltersType,
    value: HandleFilterValue
  ) => void,
  filteredPeople: Person[],
  people: Person[],
  dataComes: string,
  loading: boolean,
  error: boolean,
  filters: FiltersType,
}

export const PeopleContext = createContext<PeopleContextValue>({
  setPeople: () => {},
  setDataComes: () => {},
  setloading: () => {},
  setError: () => {},
  existingPerson: () => null,
  setFilteredPeople: () => {},
  handleChangeFilter: () => {},
  people: [],
  filteredPeople: [],
  dataComes: 'Loading',
  loading: false,
  error: false,
  filters: {
    query: '',
    sex: '',
    centuries: [],
    sortField: '',
    isReversed: false,
  },
});

export const PeopleProvider: React.FC<PeopleContextProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [dataComes, setDataComes] = useState('Loading');
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const initialFilters: FiltersType = useMemo(() => {
    return {
      query: '',
      sex: '',
      centuries: [],
      sortField: '',
      isReversed: false,
    };
  }, []);

  const [filters, setFilters] = useState(initialFilters);

  const existingPerson = (Name: string | null) => {
    if (Name === null) {
      return null;
    }

    const exPerson = people.find((person) => {
      if (person.name === Name) {
        return person;
      }

      return false;
    });

    return exPerson;
  };

  const handleChangeFilter = useCallback((
    key: keyof FiltersType,
    value: HandleFilterValue,
  ) => {
    setFilters(currentFilters => ({
      ...currentFilters,
      [key]: value,
    }));
  }, []);

  useEffect(() => {
    const filterPeople = (): Person[] => {
      return people.filter(person => {
        const queryCase = filters.query === '' || person.name.toLowerCase()
          .includes(filters.query.toLowerCase()) || (person.fatherName
            && person.fatherName?.toLowerCase()
              .includes(filters.query.toLowerCase()))
          || (person.motherName && person.motherName?.toLowerCase()
            .includes(filters.query.toLowerCase()));

        const sexCase = filters.sex === '' || person.sex === filters.sex;
        const centuryCase = filters.centuries.length < 1
          || filters.centuries.some(century => {
            return person.born < (+century * 100)
              && person.born >= ((+century - 1) * 100);
          });

        return queryCase && sexCase && centuryCase;
      });
    };

    filterAndSorting(
      filters,
      filterPeople,
      setFilteredPeople,
    );
  }, [people, filters]);

  const value = {
    people,
    dataComes,
    setFilteredPeople,
    handleChangeFilter,
    setPeople,
    setDataComes,
    setError,
    setloading,
    loading,
    error,
    existingPerson,
    filteredPeople,
    filters,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
