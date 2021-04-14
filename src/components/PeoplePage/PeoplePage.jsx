import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Form } from '../Form';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [visiblePeople, setVisiblePeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  useEffect(() => {
    setVisiblePeople(people);
  }, []);

  useEffect(() => {
    const lowerSearchValue = searchValue.toLowerCase();

    setVisiblePeople(people.filter(person => (
      person.name.toLowerCase().includes(lowerSearchValue)
      || (person.motherName
        && person.motherName.toLowerCase().includes(lowerSearchValue))
      || (person.fatherName
        && person.fatherName.toLowerCase().includes(lowerSearchValue))
    )));
  }, [people, searchValue]);

  return (
    <>
      <Form
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <h1>People Page</h1>
      <PeopleTable people={visiblePeople} />
    </>
  );
};
