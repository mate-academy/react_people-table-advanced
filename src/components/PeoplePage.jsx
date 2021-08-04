/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPeople } from '../api';
import { Form } from './Form';
import { PeopleTable } from './PeopleTable';
import { NewPerson } from './NewPerson';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  let visiblePeople = [...people];

  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get('query');
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  useEffect(() => {
    getPeople()
      .then(result => result
        .map(person => ({
          ...person,
          mother: result
            .find(mother => mother.name === person.motherName),
          father: result
            .find(father => father.name === person.fatherName),
        }
        )))
      .then(setPeople);
  }, []);

  const filterPeople = () => {
    visiblePeople = visiblePeople
      .filter(({ name, motherName, fatherName }) => {
        return `${name}${motherName}${fatherName}`
          .toLowerCase()
          .includes(query.toLowerCase());
      });
  };

  const sortPeople = () => {
    visiblePeople = visiblePeople.sort((a, b) => {
      if (sortBy === 'born' || sortBy === 'died') {
        if (sortOrder === 'asc') {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }

        return a[sortBy] > b[sortBy] ? 1 : -1;
      }

      if (sortOrder === 'asc') {
        return a[sortBy].localeCompare(b[sortBy]);
      }

      return b[sortBy].localeCompare(a[sortBy]);
    });
  };

  if (query) {
    filterPeople();
  }

  if (sortBy) {
    sortPeople();
  }

  return (
    <div className="container">
      <h1 className="title is-4">People page</h1>
      <Form />
      <NewPerson people={people} setPeople={setPeople} />
      <PeopleTable people={visiblePeople} />
    </div>
  );
};
