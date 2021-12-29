import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Human } from '../../Types/Human';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Human[]>([]);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res.map((person: Human) => {
        const mother = res.find((human: Human) => human.name === person.motherName);
        const father = res.find((human: Human) => human.name === person.fatherName);

        return { ...person, mother, father };
      })));
  }, []);

  return (
    <>
      {people && (
        <PeopleTable
          people={people}
        />
      )}
    </>
  );
};
