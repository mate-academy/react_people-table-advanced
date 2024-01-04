import { useSearchParams } from 'react-router-dom';
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Persons } from '../../../types/Persons';
import { preparePeople } from '../../../utils/preparePeople';

interface PeoplePageContextInterface {
  people: Persons[],
  setPeople: (arg: Persons[]) => void,
  loading: boolean,
  setLoading: (arg: boolean) => void,
  error: boolean,
  setError: (arg: boolean) => void,
  query: string,
  sexFilter: string,
  centuries: string[],
  sort: string,
  order: string,
}

const PeoplePageContext = createContext<PeoplePageContextInterface>({
  people: [],
  setPeople: () => {},
  loading: false,
  setLoading: () => {},
  error: false,
  setError: () => {},
  query: '',
  sexFilter: '',
  centuries: [],
  sort: '',
  order: '',
});

type Props = {
  children: React.ReactNode
};

export const PeoplePageContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Persons[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = useMemo(() => searchParams.getAll('centuries') || [],
    [searchParams]);
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const preparedPeople = preparePeople(people, {
    query,
    sexFilter,
    centuries,
    sort,
    order,
  });

  const value = useMemo(() => ({
    people: preparedPeople,
    setPeople,
    loading,
    setLoading,
    error,
    setError,
    query,
    sexFilter,
    centuries,
    sort,
    order,
  }), [
    loading,
    error,
    preparedPeople,
    query,
    sexFilter,
    centuries,
    sort,
    order,
  ]);

  return (
    <PeoplePageContext.Provider value={value}>
      {children}
    </PeoplePageContext.Provider>
  );
};

export const usePeoplePageContext = () => useContext(PeoplePageContext);
