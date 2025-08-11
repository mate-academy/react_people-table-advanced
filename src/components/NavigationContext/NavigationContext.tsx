import { createContext, useContext } from 'react';
import { useState } from 'react';
const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isHoveredPage, setIsHoveredPage] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <NavigationContext.Provider
      value={{ isHoveredPage, setIsHoveredPage, selected, setSelected }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
