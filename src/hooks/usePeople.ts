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
          setError('Something went wrong');
        }
      })
      .catch((e: Error) => {
        // eslint-disable-next-line
        console.log(e.message);

        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { people, error, isLoading };
};
