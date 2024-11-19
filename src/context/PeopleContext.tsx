import { createContext, ReactNode, useMemo } from 'react';
import { usePeople } from '../hooks/usePeople';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { usePeopleFilter } from '../hooks/usePeopleFilter';
import { usePeopleSort } from '../hooks/usePeopleSort';
import { getSortedPeople } from '../utils/getSortedPeople';

interface IPeopleContext {
  people: Person[];
  filtredPeople: Person[];
  isLoading: boolean;
  error: string;
  searchParams: URLSearchParams;
}

export const PeopleContext = createContext<IPeopleContext>({
  people: [],
  filtredPeople: [],
  isLoading: true,
  error: '',
  searchParams: new URLSearchParams(),
});

export const PeopleProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const { sex, centuries, name, searchParams } = usePeopleFilter();
  const { sort, order } = usePeopleSort();
  const { people, isLoading, error } = usePeople();

  const sortedPeople = useMemo(
    () => getSortedPeople(people, sort, order),
    [people, sort, order],
  );

  const filtredPeople = useMemo(
    () => getFilteredPeople(sortedPeople, sex, name, centuries),
    [sortedPeople, sex, name, centuries],
  );

  const store = useMemo(
    () => ({ people, filtredPeople, isLoading, error, searchParams }),
    [people, filtredPeople, isLoading, error, searchParams],
  );

  return (
    <PeopleContext.Provider value={store}>{children}</PeopleContext.Provider>
  );
};
