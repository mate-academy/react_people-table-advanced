import React, { useCallback, useContext, useRef, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type Status = 'idle' | 'loading' | 'success' | 'error';

type PeopleContextValue = {
  people: Person[];
  status: Status;
  loadPeople: () => Promise<void>;
};

export const PeopleContext = React.createContext<PeopleContextValue | null>(
  null,
);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const requestStarted = useRef(false);

  const loadPeople = useCallback(async () => {
    if (requestStarted.current) {
      return;
    }

    requestStarted.current = true;
    setStatus('loading');

    try {
      setPeople(await getPeople());
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  return (
    <PeopleContext.Provider value={{ people, status, loadPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used inside PeopleProvider');
  }

  return context;
}
