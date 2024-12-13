import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeople = () => {
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [isPeopleError, setIsPeopleError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsPeopleLoading(true);
    setIsPeopleError(false);

    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents = peopleFromServer.map(person => {
        const mother = peopleFromServer.find(p => p.name === person.motherName);
        const father = peopleFromServer.find(p => p.name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(peopleWithParents);
    } catch {
      setIsPeopleError(true);
    } finally {
      setIsPeopleLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return {
    people,
    isPeopleLoading,
    currentPerson,
    setCurrentPerson,
    isPeopleError,
  };
};
