import React, { ReactNode, useState } from 'react';
import { ContextDataType, ContextDataValues } from './types';

interface ContextProps {
  children: ReactNode;
}

const contextDefaultValue: ContextDataType = {
  context: {
    fullList: [],
    listToShow: [],
    error: null,
    isLoading: true,
  },
  setContextData: () => {},
};

export const Context = React.createContext(contextDefaultValue);

export const PeoplePageContext: React.FC<ContextProps> = ({ children }) => {
  const [contextData, setContextData] = useState<ContextDataValues>({
    fullList: [],
    listToShow: [],
    error: null,
    isLoading: true,
  });

  return (
    <Context.Provider value={{ context: { ...contextData }, setContextData }}>
      {children}
    </Context.Provider>
  );
};
