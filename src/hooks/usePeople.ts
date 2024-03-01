import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { people, isLoading, isError };
};

export default usePeople;
