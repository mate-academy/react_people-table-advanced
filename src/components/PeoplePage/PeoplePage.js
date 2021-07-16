import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { NewPerson } from './NewPerson';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';
import { PersonName } from '../PeopleTable/PersonName';

import './PeoplePage.scss';

export const PeoplePage = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { id } = match.params;
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);
  const sortParam = searchParams.get('sortBy') || '';
  const isRev = searchParams.get('sortOrder') || '';

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({ search: searchParams.toString() });
    }, 500),
    [],
  );

  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  let visiblePeople = [...people];

  if (appliedQuery) {
    const lowerQuery = appliedQuery.toLowerCase();

    visiblePeople = visiblePeople.filter(({ name, fatherName, motherName }) => (
      (name + fatherName + motherName).toLowerCase().includes(lowerQuery)));
  }

  switch (sortParam) {
    case 'name':
    case 'sex':
      visiblePeople.sort((a, b) => (
        a[sortParam].localeCompare(b[sortParam])
      ));
      break;

    case 'born':
    case 'died':
      visiblePeople.sort((a, b) => a[sortParam] - b[sortParam]);
      break;

    case 'mother':
      visiblePeople.sort((a, b) => (
        (a.motherName || 'zzz').localeCompare((b.motherName || 'zzz'))
      ));
      break;

    case 'father':
      visiblePeople.sort((a, b) => (
        (a.fatherName || 'zzz').localeCompare((b.fatherName || 'zzz'))
      ));
      break;

    default:
      break;
  }

  if (isRev === 'desc') {
    visiblePeople.reverse();
  }

  return (
    <>
      <h1 className="title">People page</h1>
      <input
        value={query}
        onChange={handleQueryChange}
        type="text"
        placeholder="Search..."
        className="input"
      />
      {(id) && (<PersonName people={people} id={id} />)}
      {(pathname.slice(-3) !== 'new') ? (
        <Link
          to="/people/new"
        >
          <button
            type="button"
            className="add-button"
          >
            Add person
          </button>
        </Link>
      ) : (<NewPerson people={people} onAdd={setPeople} />)}
      {(people.length !== 0) && (
      <PeopleTable
        people={visiblePeople}
        sortParam={sortParam}
      />
      )}
    </>
  );
};
