import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { preparePeople } from '../../utils/PreparePeople';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setIsError('');

    getPeople()
      .then(data => setPeople(preparePeople(data)))
      .catch(() => setIsError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return { people, isLoading, error };
};
