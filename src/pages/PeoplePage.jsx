import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';

const usePeople = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((peopleArray) => {
        setPeople(peopleArray.map(person => ({
          ...person,
          mother: peopleArray.find(
            ({ name }) => name === person.motherName,
          ) || null,
          father: peopleArray.find(
            ({ name }) => name === person.fatherName,
          ) || null,
        })));
      });
  }, []);

  return people;
};

const useSearchParams = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const updateSearchParams = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    history.push({ search: searchParams.toString() });
  };

  return [searchParams, updateSearchParams];
};

export const PeoplePage = () => {
  const people = usePeople();

  const [searchParams, updateSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const sortedPeople = useMemo(() => {
    if (!sortBy) {
      return people;
    }

    return [...people].sort((a, b) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return a[sortBy].localeCompare(b[sortBy]);
        default:
          return a[sortBy] - b[sortBy];
      }
    });
  }, [sortBy, people]);

  const filteredPeople = useMemo(() => {
    if (!query) {
      return sortedPeople;
    }

    return sortedPeople.filter(({ name, motherName, fatherName }) => (
      (name + motherName + fatherName).search(new RegExp(query, 'i')) !== -1
    ));
  }, [query, sortedPeople]);

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;

    setQuery(newQuery);
    updateSearchParams('query', newQuery);
  };

  const handleColumnClick = (column) => {
    setSortBy(column);
    updateSearchParams('sortBy', column);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            className="input"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter person's name"
          />

          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>

      <PeopleTable people={filteredPeople} onColumnClick={handleColumnClick} />
    </>
  );
};
