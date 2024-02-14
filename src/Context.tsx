import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Person } from './types';

interface PeopleContextProps {
  children: ReactNode;
}

interface FiltersType {
  query: string;
  sex: string;
  centuries: string[];
  sortField: string;
  isReversed: boolean;
}

type HandleFilterValue = string | boolean | string[];

interface PeopleContextValue {
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  setDataComes: (data: string) => void,
  setloading: React.Dispatch<React.SetStateAction<boolean>>,
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  setErr: (err: boolean) => void,
  existingPerson: (Name: string | null) => Person | null | undefined,
  handleChangeFilter: (
    key: keyof FiltersType,
    value: HandleFilterValue
  ) => void,
  filteredPeople: Person[],
  people: Person[],
  dataComes: string,
  loading: boolean,
  err: boolean,
  filters: FiltersType,
}

export const PeopleContext = createContext<PeopleContextValue>({
  setPeople: () => { },
  setDataComes: () => { },
  setloading: () => { },
  setErr: () => { },
  setFilters: () => { },
  existingPerson: () => null,
  setFilteredPeople: () => { },
  handleChangeFilter: () => { },
  people: [],
  filteredPeople: [],
  dataComes: 'Loading',
  loading: false,
  err: false,
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
  const [err, setErr] = useState(false);

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

    const exPerson = people.find((per) => {
      if (per.name === Name) {
        return per;
      }

      return false;
    });

    return exPerson;
  };

  const handleChangeFilter = useCallback((
    key: keyof FiltersType,
    value: HandleFilterValue,
  ) => {
    setFilters(currentFilters => {
      return {
        ...currentFilters,
        [key]: value,
      };
    });
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

    if (!filters.isReversed) {
      const reversedFilteredPeople = filterPeople().sort((person1, person2) => {
        switch (filters.sortField) {
          case 'born':
            return person1.born - person2.born;
          case 'died':
            return person1.died - person2.died;
          case 'sex':
            return person1.sex.localeCompare(person2.sex);
          case 'name':
            return person1.name.localeCompare(person2.name);
          default:
            return 0;
        }
      });

      setFilteredPeople(reversedFilteredPeople);
    } else {
      setFilteredPeople(filterPeople());
    }
  }, [people, filters]);

  const value = {
    people,
    dataComes,
    setFilteredPeople,
    handleChangeFilter,
    setPeople,
    setDataComes,
    setErr,
    setloading,
    setFilters,
    loading,
    err,
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
