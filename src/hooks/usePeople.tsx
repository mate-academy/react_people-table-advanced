import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

const compareWithParents = (data: Person[]) =>
  data.map(person => ({
    ...person,
    mother: data.find(({ name }) => name === person.motherName),
    father: data.find(({ name }) => name === person.fatherName),
  }));

export const usePeople = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(compareWithParents(data));
        setIsSuccess(true);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    data: people,
    isLoading,
    isSuccess,
    isError: !!error,
    error,
  };
};
