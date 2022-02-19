import React, { useEffect, useState } from 'react';
// Api requests
import { getPeople } from '../../api/people';
// Components
import { PeopleTable } from '../PeopleTable';
// Types
import { Person } from '../../types/Person/Person';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getUpdatedPeople = (peopleArr: Person[]) => {
    const getParent = (
      arr:Person[],
      person: Person,
      key: keyof Person,
    ) => {
      const parent = arr.find(currentPerson => currentPerson.name === person[key]);

      return parent || null;
    };

    return peopleArr.map(person => {
      return {
        ...person,
        father: getParent(peopleArr, person, 'fatherName'),
        mother: getParent(peopleArr, person, 'motherName'),
      };
    });
  };

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(getUpdatedPeople(peopleFromServer)));
  }, []);

  return (
    <>
      <h1>People page</h1>

      {people.length > 0 && <PeopleTable people={people} getUpdatedPeople={getUpdatedPeople} />}
    </>
  );
};
