import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from '../../api';
import { Form } from '../Form';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [visiblePeople, setVisiblePeople] = useState([]);
  const [sortPeopleBy, setSortPeopleBy] = useState('');

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get('query');

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  useEffect(() => {
    setVisiblePeople(people);
  }, []);

  useEffect(() => {
    if (searchValue) {
      const lowerSearchValue = searchValue.toLowerCase();

      setVisiblePeople(people.filter(person => (
        person.name.toLowerCase().includes(lowerSearchValue)
        || (person.motherName
          && person.motherName.toLowerCase().includes(lowerSearchValue))
        || (person.fatherName
          && person.fatherName.toLowerCase().includes(lowerSearchValue))
      )));
    } else {
      setVisiblePeople(people);
    }
  }, [people, searchValue]);

  useEffect(() => {
    let sortedPeople = [];

    switch (sortPeopleBy) {
      case 'name':
        sortedPeople = [...people].sort((currentPerson, nextPerson) => (
          currentPerson.name.localeCompare(nextPerson.name)
        ));
        break;

      case 'sex':
        sortedPeople = [...people].sort((currentPerson, nextPerson) => (
          currentPerson.sex.localeCompare(nextPerson.sex)
        ));
        break;

      case 'born':
        sortedPeople = [...people].sort((currentPerson, nextPerson) => (
          +currentPerson.born - +nextPerson.born
        ));
        break;

      case 'died':
        sortedPeople = [...people].sort((currentPerson, nextPerson) => (
          +currentPerson.died - +nextPerson.died
        ));
        break;

      default:
        sortedPeople.push([...people]);
        break;
    }

    setVisiblePeople(sortedPeople);
    sortedPeople = [];
  }, [sortPeopleBy]);

  const handleSort = useCallback(
    (value) => {
      setSortPeopleBy(value);
    }, [],
  );

  return (
    <>
      <Form
        searchValue={searchValue}
        history={history}
      />
      <h1>People Page</h1>
      <PeopleTable people={visiblePeople} handleSort={handleSort} />
    </>
  );
};
