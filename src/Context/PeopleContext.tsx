import React, { createContext, useContext, useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../utils/fetchClient';
import { ErrorMessage } from '../types/ErrorMessage';

type UsersContextType = {
  users: Person[];
  setUsers: React.Dispatch<React.SetStateAction<Person[]>>;
  loading: boolean;
  error: string | null;
};

export const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
  loading: false,
  error: null,
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const data = await getPeople();

        setUsers(data);
      } catch {
        setError(ErrorMessage.peopleLoadingError);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

export const usePeople = () => useContext(UsersContext);
