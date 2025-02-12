import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export function useGetPeople() {
  const [isError, setIsError] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getDate() {
      setIsLoading(true);
      setIsError(false);
      try {
        const date = await getPeople();

        const result = date.map(person => {
          let fullPerson = { ...person };

          if (person.motherName) {
            const mother = date.find(per => per.name === person.motherName);

            fullPerson = { ...fullPerson, mother };
          }

          if (person.fatherName) {
            const father = date.find(per => per.name === person.fatherName);

            fullPerson = { ...fullPerson, father };
          }

          return fullPerson;
        });

        setPeople(result);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getDate();
  }, []);

  const peopleLen = useMemo(() => {
    if (people) {
      return people.length;
    }

    return 0;
  }, [people]);

  return { people, isLoading, isError, peopleLen };
}
