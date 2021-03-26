import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTable';
import { Person } from './types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState<string>(appliedQuery);
  const history = useHistory();
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push(
        {
          search: searchParams.toString(),
        },
      );
    }, 500),
    [],
  );

  const getVisiblePeople = () => {
    const visiblePeople = appliedQuery
      ? people.filter(person => (
        (person.name + person.motherName + person.fatherName)
          .toLowerCase().includes(appliedQuery)))
      : people;

    if (sortBy) {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return visiblePeople.sort((a, b) => (
            sortOrder === 'ASC'
              ? a[sortBy].localeCompare(b[sortBy])
              : b[sortBy].localeCompare(a[sortBy])
          ));
        case 'born':
        case 'died':
          return visiblePeople.sort((a, b) => (
            sortOrder === 'ASC'
              ? a[sortBy] - b[sortBy]
              : b[sortBy] - a[sortBy]
          ));

        default:
          break;
      }
    }

    return visiblePeople;
  };

  return (
    <div>
      <h2 className="pageTitle">People page</h2>
      <div className="people__filter">
        <div>
          <p className="peopleTable__Header">People table</p>
          <span className="formtext_left"> Find person by name: </span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              applyQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <PeopleTable people={getVisiblePeople()} />
    </div>
  );
};
