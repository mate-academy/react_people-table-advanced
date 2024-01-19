import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { SexFilter, SortType, OrderType } from '../types';
import { getSearchWith } from '../utils';

// TYPE
type PeopleListContextType = {
  sexFilter: SexFilter,
  query: string,
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
  centuriesFilter: string[],
  sortBy: SortType,
  order: OrderType,
};

// DEFAULT VALUES
const PeopleListContextDefault = {
  sexFilter: null,
  query: '',
  handleInputChange: () => { },
  centuriesFilter: [],
  sortBy: null,
  order: null,
};

// CREATE CONTEXT
export const PeopleListContext
  = createContext<PeopleListContextType>(PeopleListContextDefault);

// CUSTOM PROVIDER
type Props = PropsWithChildren;

export const PeopleListProvider: FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') as SexFilter;
  const query = searchParams.get('q') || '';
  const centuriesFilter = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort') as SortType;
  const order = searchParams.get('order') as OrderType;

  const handleInputChange
    = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.trim();
      const queryValue = inputValue === ''
        ? null
        : inputValue;

      setSearchParams(
        getSearchWith(searchParams, { q: queryValue }),
      );
    }, [searchParams, setSearchParams]);

  // CONTEXT VALUE
  const PeopleListContextValue = {
    sexFilter,
    query,
    handleInputChange,
    centuriesFilter,
    sortBy,
    order,
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
