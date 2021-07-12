import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const sortParam = searchParams.get('sortBy') || '';
  const isRev = searchParams.get('sortOrder') || false;

  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(result => setPeople(result));
  }, []);

  let visiblePeople;

  switch (sortParam) {
    case 'name':
    case 'sex':
      visiblePeople = [...people].sort((a, b) => (
        a[sortParam].localeCompare(b[sortParam])
      ));
      break;

    case 'born':
    case 'died':
      visiblePeople = [...people].sort((a, b) => a[sortParam] - b[sortParam]);
      break;

    case 'mother':
      visiblePeople = [...people].sort((a, b) => (
        (a.motherName || 'zzz').localeCompare((b.motherName || 'zzz'))
      ));
      break;

    case 'father':
      visiblePeople = [...people].sort((a, b) => (
        (a.fatherName || 'zzz').localeCompare((b.fatherName || 'zzz'))
      ));
      break;

    default:
      visiblePeople = [...people];
  }

  if (isRev === 'desc') {
    visiblePeople.reverse();
  }

  return (
    <>
      <h1 className="title">People page</h1>
      {(people.length !== 0) && (
      <PeopleTable
        people={visiblePeople}
        sortParam={sortParam}
      />
      )}
    </>
  );
};
