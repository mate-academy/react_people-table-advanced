import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTabele';

export function PeoplePage() {
  const [people, setPeople] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  const query = searchParams.get('query') || '';
  const handleChange = (event) => {
    if (event.target.value) {
      searchParams.set('query', event.target.value);
    } else {
      searchParams.delete('query');
    }

    history.push(`?${searchParams.toString()}`);
  };

  const sortBy = searchParams.get('sortBy') || '';

  const handleSortBy = (tabSortType) => {
    if (
      tabSortType !== sortBy
    ) {
      searchParams.set(
        'sortBy',
        tabSortType,
      );
      searchParams.set('sortOrder', 'asc');
    }

    if (sortBy === tabSortType) {
      if (sortOrder === 'desc') {
        searchParams.set('sortOrder', 'asc');
      } else {
        searchParams.set('sortOrder', 'desc');
      }
    }

    history.push(`?${searchParams.toString()}`);
  };

  let visiblePeople = [];

  if (query) {
    visiblePeople = people.filter(
      person => person.name.includes(query)
        || (person.motherName !== null ? person.motherName.includes(query) : '')
        || (person.fatherName !== null
          ? person.fatherName.includes(query) : ''),
    );
  } else {
    visiblePeople = people;
  }

  const posibleSortBy = [
    `name`,
    `sex`,
    `born`,
    `died`,
    'motherName',
    'fatherName',
  ];

  const sortOrder = searchParams.get('sortOrder');

  if (posibleSortBy.includes(sortBy)) {
    visiblePeople = visiblePeople.sort((p1, p2) => {
      if (p1[sortBy] > p2[sortBy]) {
        return 1;
      }

      if (p1[sortBy] < p2[sortBy]) {
        return -1;
      }

      return 0;
    });
  }

  if (sortOrder === 'desc') {
    visiblePeople.reverse();
  }

  return (
    <>
      <h1> People Page</h1>
      <input
        type="text"
        value={query}
        onChange={event => handleChange(event)}
      />
      <PeopleTable people={visiblePeople} onSortBy={handleSortBy} />
    </>
  );
}
