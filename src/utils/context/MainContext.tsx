import React, { ReactNode, useState } from 'react';
import { ContextDataType, Lists } from './types';

interface ContextProps {
  children: ReactNode;
}

const contextDefaultValue: ContextDataType = {
  context: {
    fullList: [],
    listToShow: [],
  },
  setContextData: () => {},
};

export const Context = React.createContext(contextDefaultValue);

export const MainContext: React.FC<ContextProps> = ({ children }) => {
  const [contextData, setContextData] = useState<Lists>({
    fullList: [],
    listToShow: [],
  });

  return (
    <Context.Provider value={{ context: { ...contextData }, setContextData }}>
      {children}
    </Context.Provider>
  );
};
