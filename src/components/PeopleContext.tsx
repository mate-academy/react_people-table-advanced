import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  error: boolean | null;
  setError: React.Dispatch<React.SetStateAction<boolean | null>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeopleContext = React.createContext<ContextType>({
  people: [],
  setPeople: () => {},
  error: false || null,
  setError: () => {},
  loader: false,
  setLoader: () => {},
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean | null>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        handleError();
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        error,
        setError,
        loader,
        setLoader,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
