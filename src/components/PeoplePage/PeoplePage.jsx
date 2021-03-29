import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../API/api';
import { Form } from '../Form';

export function PeoplePage() {
  const [people, setPeople] = useState([]);
  const location = useLocation();
  const match = useRouteMatch('/people/:slug?');
  const { slug } = match.params;
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  let visiblePeople = people;

  if (query) {
    const lowerQuery = query.toLowerCase();

    visiblePeople = people.filter(
      ({ name }) => name.toLowerCase().includes(lowerQuery),
    );
  }

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <h2 className="title">People page</h2>
      <Form searchParams={searchParams} />

      {people.length > 0 && (
      <PeopleTable
        people={visiblePeople}
        slug={slug}
        searchParams={searchParams}
      />
      )}
    </>
  );
}
