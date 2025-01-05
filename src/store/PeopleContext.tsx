import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useEffect } from 'react';

interface PeopleContextType {
  people: Person[];
  sortCriteria: keyof Person | null;
  setSortCriteria: React.Dispatch<React.SetStateAction<keyof Person | null>>;
  setFilterCriteria: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  errorMessage: string;
  loadPeople: () => Promise<void>;
  sortPeople: (criteria: keyof Person) => void;
  filterPeople: (filterItem: string | 0) => void;
  filterCriteria: string | null;
  resetAllCenturyList: () => void;
  activeCenturies: number[];
  setActiveCenturies: React.Dispatch<React.SetStateAction<number[]>>;
  filteredPeople: Person[];
  centuries: number[];
  queryInput: string;
  setQueryInput: React.Dispatch<React.SetStateAction<string>>;
  visiblePeople: Person[];
  totalReset: () => void;
  selectedSex: string;
  setSelectedSex: React.Dispatch<React.SetStateAction<string>>;
  totalPutReset: boolean;
  setTotalPutReset: React.Dispatch<React.SetStateAction<boolean>>;
  isResetAllActive: boolean;
  setIsResetAllAcive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  sortCriteria: null,
  setSortCriteria: () => {},
  setFilterCriteria: () => {},
  loading: false,
  errorMessage: '',
  loadPeople: async () => {},
  sortPeople: () => {},
  filterPeople: () => {},
  filterCriteria: null,
  resetAllCenturyList: () => {},
  activeCenturies: [],
  setActiveCenturies: () => {},
  filteredPeople: [],
  centuries: [],
  queryInput: '',
  setQueryInput: () => {},
  visiblePeople: [],
  totalReset: () => {},
  selectedSex: '',
  setSelectedSex: () => {},
  totalPutReset: false,
  setTotalPutReset: () => {},
  isResetAllActive: false,
  setIsResetAllAcive: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortCriteria, setSortCriteria] = useState<keyof Person | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<string | null>(null);
  const [currentFilterPeople, setCurrentFilterPeople] = useState<Person[]>([]);

  const [activeCenturies, setActiveCenturies] = useState<number[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const centuries = useMemo(() => [16, 17, 18, 19, 20], []);

  const [queryInput, setQueryInput] = useState<string>('');
  const [totalPutReset, setTotalPutReset] = useState<boolean>(false);

  const [selectedSex, setSelectedSex] = useState<string>('all');

  const [isResetAllActive, setIsResetAllAcive] = useState<boolean>(false);

  const initialPeopleRef = useRef<Person[]>([]);
  const count = useRef(0);

  const getPreparedPeople = (peopleList: Person[], newQuery: string) => {
    let preparedPeople = [...peopleList];
    const query = newQuery.toLowerCase().trim();

    if (people) {
      preparedPeople = preparedPeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    if (isResetAllActive) {
      preparedPeople = [...initialPeopleRef.current];
    }

    return preparedPeople;
  };

  const visiblePeople = getPreparedPeople(filteredPeople, queryInput);

  const loadPeople = useCallback(() => {
    setLoading(true);

    return getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);

        if (initialPeopleRef.current.length === 0) {
          initialPeopleRef.current = fetchedPeople;
        }
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const resetPeople = useCallback(() => {
    setPeople(initialPeopleRef.current);
  }, []);

  const sortPeople = useCallback(
    (criteria: keyof Person) => {
      count.current += 1;

      count.current = count.current > 3 ? 1 : count.current;

      if (
        count.current === 3 &&
        ['name', 'sex', 'born', 'died'].includes(criteria as string)
      ) {
        resetPeople();

        return;
      }

      const sorted = [...people].sort((a, b) => {
        if (count.current === 1) {
          return criteria === 'name' || criteria === 'sex'
            ? (a[criteria] as string).localeCompare(b[criteria] as string)
            : (a[criteria] as number) - (b[criteria] as number);
        }

        if (count.current === 2) {
          return criteria === 'name' || criteria === 'sex'
            ? b[criteria].localeCompare(a[criteria])
            : (b[criteria] as number) - (a[criteria] as number);
        }

        return 0;
      });

      setPeople(sorted);
    },
    [people, resetPeople],
  );

  const filterPeople = useCallback((genderItem: string | 0) => {
    if (genderItem === '' || genderItem === 'all') {
      setCurrentFilterPeople(initialPeopleRef.current);
      setPeople(initialPeopleRef.current);
    } else {
      const filteredByGender = initialPeopleRef.current.filter(
        person => person.sex === genderItem,
      );

      setCurrentFilterPeople(filteredByGender);
      setPeople(filteredByGender);
    }
  }, []);

  useEffect(() => {
    if (activeCenturies.length === 0) {
      setFilteredPeople(people);
    } else {
      const filtered = people.filter(person =>
        activeCenturies.includes(Math.ceil(person.born / 100)),
      );

      setFilteredPeople(filtered);
    }
  }, [activeCenturies, people]);

  const resetAllCenturyList = useCallback(() => {
    if (currentFilterPeople.length === 0) {
      setPeople(initialPeopleRef.current);
    } else {
      setPeople(currentFilterPeople);
    }
  }, [currentFilterPeople]);

  const totalReset = useCallback(() => {
    setQueryInput('');
    setActiveCenturies([]);
    resetPeople();
  }, [resetPeople]);

  const value = useMemo(
    () => ({
      people,
      sortCriteria,
      setSortCriteria,
      setFilterCriteria,
      loading,
      errorMessage,
      loadPeople,
      sortPeople,
      filterPeople,
      filterCriteria,
      resetAllCenturyList,
      activeCenturies,
      setActiveCenturies,
      filteredPeople,
      centuries,
      queryInput,
      setQueryInput,
      visiblePeople,
      totalReset,
      selectedSex,
      setSelectedSex,
      totalPutReset,
      setTotalPutReset,
      isResetAllActive,
      setIsResetAllAcive,
    }),
    [
      people,
      sortCriteria,
      setSortCriteria,
      setFilterCriteria,

      loading,
      errorMessage,
      loadPeople,
      sortPeople,
      filterPeople,
      filterCriteria,
      resetAllCenturyList,
      activeCenturies,
      setActiveCenturies,
      filteredPeople,
      centuries,
      queryInput,
      setQueryInput,
      visiblePeople,
      totalReset,
      selectedSex,
      setSelectedSex,
      totalPutReset,
      setTotalPutReset,
      isResetAllActive,
      setIsResetAllAcive,
    ],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
