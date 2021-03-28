import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople } from './api';
import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sort = searchParams.get('sortBy');

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push(`?${searchParams.toString()}`);
    }, 500),

    [],
  );

  const peopleWithParents = people.map(person => ({
    ...person,
    father: people.find(man => man.name === person.fatherName),
    mother: people.find(women => women.name === person.motherName),
  }));

  let visiblePeople = peopleWithParents;

  if (appliedQuery) {
    const lowerQuery = appliedQuery.toLowerCase();

    visiblePeople = peopleWithParents.filter(
      person => (person.name.toLowerCase()
        .includes(lowerQuery)
      || person.fatherName
        && person.fatherName.toLowerCase().includes(lowerQuery)
      || person.motherName
        && person.motherName.toLowerCase().includes(lowerQuery)
      ),
    );
  }

  if (sort) {
    switch (sort) {
      case 'name':
        visiblePeople.sort(
          (currentPerson, nextPerson) => currentPerson.name
            .localeCompare(nextPerson.name),
        );
        break;
      case 'sex':
        visiblePeople.sort(
          (currentPerson, nextPerson) => currentPerson.sex
            .localeCompare(nextPerson.sex),
        );
        break;
      case 'born':
        visiblePeople.sort(
          (currentPerson, nextPerson) => currentPerson.born - nextPerson.born,
        );
        break;
      case 'died':
        visiblePeople.sort(
          (currentPerson, nextPerson) => currentPerson.died - nextPerson.died,
        );
        break;
      default:
        visiblePeople = visiblePeople;
    }
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleClick = (event) => {
    if (event.target.innerText) {
      searchParams.set('sortBy', event.target.innerText);
    } else {
      searchParams.delete('sortBy');
    }

    history.push({ search: searchParams.toString() });
  };

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <input
        className="input"
        name="name"
        placeholder="name"
        value={query}
        onChange={handleQueryChange}
      />
      <table className="PeopleTable table is-bordered is-striped is-hoverable">
        <thead className="subtitle is-4">
          <tr>
            <td
              onClick={handleClick}
              style={{ backgroundColor: sort === 'name'
                ? 'greenyellow'
                : 'inherit' }}
            >
              name
            </td>
            <td
              onClick={handleClick}
              style={{ backgroundColor: sort === 'sex'
                ? 'greenyellow'
                : 'inherit' }}
            >
              sex
            </td>
            <td
              onClick={handleClick}
              style={{ backgroundColor: sort === 'born'
                ? 'greenyellow'
                : 'inherit' }}
            >
              born
            </td>
            <td
              onClick={handleClick}
              style={{ backgroundColor: sort === 'died'
                ? 'greenyellow'
                : 'inherit' }}
            >
              died
            </td>
            <td>mother</td>
            <td>father</td>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
