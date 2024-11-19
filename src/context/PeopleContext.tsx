import { createContext, ReactNode, useMemo } from 'react';
import { usePeople } from '../hooks/usePeople';
import { Person } from '../types';
import { usePeopleRouting } from '../hooks/usePeopleRouting';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { usePeopleFilter } from '../hooks/usePeopleFilter';
import { usePeopleSort } from '../hooks/usePeopleSort';
import { getSortedPeople } from '../utils/getSortedPeople';

interface IPeopleContext {
  filtredPeople: Person[];
  isLoading: boolean;
  error: string;
  personId: string | undefined;
  searchParams: URLSearchParams;
}

export const PeopleContext = createContext<IPeopleContext>({
  filtredPeople: [],
  isLoading: true,
  error: '',
  personId: undefined,
  searchParams: new URLSearchParams(),
});

export const PeopleProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const { personId } = usePeopleRouting();
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
    () => ({
      filtredPeople,
      isLoading,
      error,
      personId,
      searchParams,
    }),
    [filtredPeople, isLoading, error, personId, searchParams],
  );

  return (
    <PeopleContext.Provider value={store}>{children}</PeopleContext.Provider>
  );
};
