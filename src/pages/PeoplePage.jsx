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
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const filteredPeople = useMemo(() => {
    if (!query) {
      return people;
    }

    return people.filter(({ name, motherName, fatherName }) => (
      (name + motherName + fatherName).search(new RegExp(query, 'i')) !== -1
    ));
  }, [query, people]);

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;

    setQuery(newQuery);
    updateSearchParams('query', newQuery);
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
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>

      <PeopleTable people={filteredPeople} />
    </>
  );
};
