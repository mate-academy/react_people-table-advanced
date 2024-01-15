import {
  ChangeEvent,
  // eslint-disable-next-line max-len
  FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';

// TYPE
type PeopleListContextType = {
  sexFilter: SexFilter,
  query: string,
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
  centuriesFilter: string[],
};

// DEFAULT VALUES
const PeopleListContextDefault = {
  sexFilter: null,
  query: '',
  handleInputChange: () => { },
  centuriesFilter: [],
};

// CREATE CONTEXT
export const PeopleListContext
  = createContext<PeopleListContextType>(PeopleListContextDefault);

// CUSTOM PROVIDER
type Props = PropsWithChildren;

export const PeopleListProvider: FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sexFilter, setSexFilter] = useState<SexFilter>(null);
  const [query, setQuery] = useState<string>('');
  const centuriesFilter = searchParams.getAll('centuries');

  const handleSexFilterChange = useCallback((filter: SexFilter) => {
    if (sexFilter !== filter) {
      setSexFilter(filter);
    }
  }, [sexFilter]);

  const handleInputChange
    = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim() || '';

      setQuery(value);
      searchParams.set('q', value);

      setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

  useEffect(() => {
    handleSexFilterChange(searchParams.get('sex') as SexFilter);
    setQuery(searchParams.get('q') || '');
  }, [handleSexFilterChange, searchParams]);

  // CONTEXT VALUE
  const PeopleListContextValue = {
    sexFilter,
    query,
    handleInputChange,
    centuriesFilter,
  };

  return (
    <PeopleListContext.Provider value={PeopleListContextValue}>
      {children}
    </PeopleListContext.Provider>
  );
};

// CUSTOM HOOK
export const usePeopleListContext = () => {
  const context = useContext(PeopleListContext);

  if (!context) {
    throw new Error(
      'usePeopleListContext cannot be used outside PeopleListProvider',
    );
  }

  return context;
};
