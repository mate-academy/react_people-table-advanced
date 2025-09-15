import React, { createContext, useContext, useState } from 'react';

interface SelectedPersonContextProps {
  selectedSlug: string | null;
  setSelectedSlug: (slug: string | null) => void;
}

const SelectedPersonContext = createContext<SelectedPersonContextProps | null>(
  null,
);

export const useSelectedPerson = () => {
  const ctx = useContext(SelectedPersonContext);

  if (!ctx) {
    throw new Error(
      'useSelectedPerson must be used within SelectedPersonProvider',
    );
  }

  return ctx;
};

interface SelectedPersonProviderProps {
  children: React.ReactNode;
}

export const SelectedPersonProvider: React.FC<SelectedPersonProviderProps> = ({
  children,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <SelectedPersonContext.Provider value={{ selectedSlug, setSelectedSlug }}>
      {children}
    </SelectedPersonContext.Provider>
  );
};
