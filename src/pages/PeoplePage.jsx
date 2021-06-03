import React, { useState, useEffect } from 'react';

import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

const usePeople = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((peopleArray) => {
        setPeople(peopleArray.map(person => ({
          ...person,
          mother: peopleArray.find(
            ({ name }) => name === person.motherName,
          ) || null,
          father: peopleArray.find(
            ({ name }) => name === person.fatherName,
          ) || null,
        })));
      });
  }, []);

  return people;
};

export const PeoplePage = () => {
  const people = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} />
    </>
  );
};
