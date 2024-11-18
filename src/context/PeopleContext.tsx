import { createContext, ReactNode, useMemo } from 'react';
import { usePeople } from '../hooks/usePeople';
import { Person } from '../types';
import { usePeopleRouting } from '../hooks/usePeopleRouting';
import { getFilteredPeople } from '../utils/getFilteredPeople';

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
  const { personId, sex, centuries, name, searchParams } = usePeopleRouting();

  const { people, isLoading, error } = usePeople();

  const filtredPeople = useMemo(() => {
    return getFilteredPeople(people, sex, name, centuries);
  }, [people, sex, name, centuries]);

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
