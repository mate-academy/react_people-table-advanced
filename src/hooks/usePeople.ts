import { useEffect, useState } from 'react';

import Person from '../types/Person';
import { getPeople } from '../api';

const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Cannot load people. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { people, isLoading, errorMessage };
};

export default usePeople;
