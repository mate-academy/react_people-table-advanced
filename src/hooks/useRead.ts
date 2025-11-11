// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Person } from '../types';

const apiUrl =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const useRead = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const peopleWithLinks = (peopleReady: Person[]): Person[] => {
    const mapByName = new Map<string, Person>();

    peopleReady.forEach(p => mapByName.set(p.name, p));

    return peopleReady.map(p => ({
      ...p,
      father: p.fatherName
        ? mapByName.get(p.fatherName) || undefined
        : undefined,
      mother: p.motherName
        ? mapByName.get(p.motherName) || undefined
        : undefined,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    axios
      .get(apiUrl)
      .then(resp => {
        const allPersons = resp.data;

        setTimeout(() => setPeople(peopleWithLinks(allPersons)), 100);
      })
      .catch(() => setHasError(true))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 100);
      });
  }, []);

  return { people, hasError, isLoading };
};
