import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchState, setFetchState] = useState<'success' | 'loading' | 'fail'>(
    'loading',
  );

  useEffect(() => {
    getPeople()
      .then((data: Person[]) => {
        const nameToPersonMap = new Map<string, Person>();

        data.forEach(person => {
          nameToPersonMap.set(person.name, person);
        });

        const updatedPeople = data.map(dataPerson => {
          const newPerson = { ...dataPerson };

          const father = nameToPersonMap.get(dataPerson.fatherName || '');
          const mother = nameToPersonMap.get(dataPerson.motherName || '');

          if (father) {
            newPerson.father = father;
          }

          if (mother) {
            newPerson.mother = mother;
          }

          return newPerson;
        });

        setPeople(updatedPeople);
        setFetchState('success');
      })
      .catch(() => {
        setFetchState('fail');
      });
  }, []);

  return { people, fetchState };
};

export default usePeople;
