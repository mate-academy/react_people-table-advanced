import { useLayoutEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    getPeople()
      .then(data => {
        if (Array.isArray(data)) {
          setPeople(getPeopleWithParents(data));
        } else {
          setError('Fetch people with an error');
        }
      })
      .catch((e: Error) => {
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { people, error, isLoading };
};
