import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

type UsePeopleState = {
  people: Person[];
  isLoading: boolean;
  error: boolean;
};

export const usePeople = (): UsePeopleState => {
  const [state, setState] = useState<UsePeopleState>({
    people: [],
    isLoading: false,
    error: false,
  });

  useEffect(() => {
    const loadPeople = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: false }));

      try {
        const data = await getPeople();

        setState({ people: data, isLoading: false, error: false });
      } catch {
        setState(prev => ({ ...prev, isLoading: false, error: true }));
      }
    };

    loadPeople();
  }, []);

  return state;
};
