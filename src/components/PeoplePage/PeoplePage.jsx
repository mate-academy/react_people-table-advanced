import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import debounce from 'lodash/debounce';
import { PeopleTable } from '../PeopleTable';

import { getPeople } from '../../api/people';

import 'bulma';
import './PeoplePage.scss';

const sortByName = (left, right) => (
  left.name.localeCompare(right.name)
);

const sortBySex = (left, right) => (
  left.sex.localeCompare(right.sex)
);

const sortByBorn = (left, right) => (
  left.born - right.born
);

const sortByDied = (left, right) => (
  left.died - right.died
);

const sortByNameDesc = (left, right) => (
  right.name.localeCompare(left.name)
);

const sortBySexDesc = (left, right) => (
  right.sex.localeCompare(left.sex)
);

const sortByBornDesc = (left, right) => (
  right.born - left.born
);

const sortByDiedDesc = (left, right) => (
  right.died - left.died
);

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder');

  useEffect(() => {
    getPeople()
      .then((persons) => {
        setPeople(persons);
      });
  }, []);

  let visiblePeople = [];

  if (appliedQuery) {
    const lowerQuery = appliedQuery.toLowerCase();

    visiblePeople = people.filter((person) => {
      const { name, motherName, fatherName } = person;

      return (
        (name ? name.toLowerCase().includes(lowerQuery) : false)
        || (motherName ? motherName.toLowerCase().includes(lowerQuery) : false)
        || (fatherName ? fatherName.toLowerCase().includes(lowerQuery) : false)
      );
    });
  } else {
    visiblePeople = people;
  }

  if (sortBy) {
    switch (sortBy) {
      case 'name': {
        if (sortOrder === 'asc') {
          visiblePeople.sort(sortByName);
        } else {
          visiblePeople.sort(sortByNameDesc);
        }

        break;
      }

      case 'sex': {
        if (sortOrder === 'asc') {
          visiblePeople.sort(sortBySex);
        } else {
          visiblePeople.sort(sortBySexDesc);
        }

        break;
      }

      case 'born': {
        if (sortOrder === 'asc') {
          visiblePeople.sort(sortByBorn);
        } else {
          visiblePeople.sort(sortByBornDesc);
        }

        break;
      }

      case 'died': {
        if (sortOrder === 'asc') {
          visiblePeople.sort(sortByDied);
        } else {
          visiblePeople.sort(sortByDiedDesc);
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({
        search: searchParams.toString(),
      });
    }, 500),
    [],
  );

  const handleQueryChange = ({ target }) => {
    setQuery(target.value);
    applyQuery(target.value);
  };

  return (
    <>
      <div className=" people-page content is-large">
        <h1>People Page</h1>

        <form>
          <input
            type="text"
            className="input"
            placeholder="Filter"
            value={query}
            onChange={handleQueryChange}
          />
        </form>
        <PeopleTable people={visiblePeople} />
      </div>
    </>
  );
};
