import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { PeopleTable } from './PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[]>();

  useEffect(() => {
    getPeople().then((peopleArray:Person[]) => {
      const extendedPeople = peopleArray.map(person => {
        const personCopy = { ...person };

        personCopy.mother = peopleArray.find(
          person2 => person.motherName === person2.name,
        );

        personCopy.father = peopleArray.find(
          person2 => person.fatherName === person2.name,
        );

        return personCopy;
      });

      setPeople(extendedPeople);
    });
  }, []);

  return (
    <>
      <h1> People Page</h1>
      <PeopleTable people={people} />
    </>
  );
};

export default People;
