import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const { isLoading, isFetching, isError } = useQuery<Person[]>(
    ['people'],
    getPeople,
    {
      onSuccess: data => {
        setPeople(
          data.map(person => ({
            ...person,
            mother: data.find(mother => mother.name === person.motherName),
            father: data.find(father => father.name === person.fatherName),
          })),
        );
      },
    },
  );

  return {
    people,
    isLoading,
    isFetching,
    isError,
  };
};
