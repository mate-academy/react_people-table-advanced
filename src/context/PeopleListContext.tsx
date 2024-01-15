import {
  FC, PropsWithChildren, createContext, useContext, useState,
} from 'react';
import { SexFilter } from '../types/SexFilter';

type PeopleListContextType = {
  sexFilter: SexFilter,
  handleSexFilterChange: (filter: SexFilter) => void;
};

const PeopleListContextDefault = {
  sexFilter: SexFilter.ALL,
  handleSexFilterChange: () => { },
};

export const PeopleListContext
  = createContext<PeopleListContextType>(PeopleListContextDefault);

type Props = PropsWithChildren;

export const PeopleListProvider: FC<Props> = ({ children }) => {
  const [sexFilter, setSexFilter] = useState<SexFilter>(SexFilter.ALL);

  const handleSexFilterChange = (filter: SexFilter) => {
    if (sexFilter !== filter) {
      setSexFilter(filter);
    }
  };

  const PeopleListContextValue = {
    sexFilter,
    handleSexFilterChange,
  };

  return (
    <PeopleListContext.Provider value={PeopleListContextValue}>
      {children}
    </PeopleListContext.Provider>
  );
};

export const usePeopleListContext = () => {
  const context = useContext(PeopleListContext);

  if (!context) {
    throw new Error(
      'usePeopleListContext cannot be used outside PeopleListProvider',
    );
  }

  return context;
};
