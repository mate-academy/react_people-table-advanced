import React, { useState, useEffect } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from '../PeopleTable';
import { Human, Child } from '../types/human';

function findParents(people: Human[]): Child[] {
  return people.map(human => {
    const { motherName, fatherName } = human;

    return {
      ...human,
      mother: people.find(mother => motherName === mother.name),
      father: people.find(father => fatherName === father.name),
    };
  });
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Human[]>([]);

  useEffect(() => {
    getPeople()
      .then(newPeople => setPeople(findParents(newPeople)));
  }, []);

  return (
    <>
      <h1>People page</h1>

      <PeopleTable people={people} />
    </>
  );
};
