import React, { useState, useEffect } from 'react';

import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((peopleArray) => {
        setPeople(peopleArray.map(person => ({
          ...person,
          mother: peopleArray.find(
            ({ motherName }) => motherName.localeCompare(person.motherName),
          ) || null,
          father: peopleArray.find(
            ({ fatherName }) => fatherName.localeCompare(person.fatherName),
          ) || null,
        })));
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} />
    </>
  );
};
