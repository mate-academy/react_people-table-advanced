import React, { useCallback, useContext, useState } from 'react';
import debounce from 'lodash/debounce';
import './PeoplePage.scss';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleContext } from '../PeopleContext';

export const PeoplePage = () => {
  const { people } = useContext(PeopleContext);
  let filteredPeople;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate(`?${searchParams.toString()}`);
    }, 500), [],
  );

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    applyQuery(event.target.value.toLowerCase());
  };

  if (appliedQuery) {
    filteredPeople = people
      .filter(person => (
        person.name !== null
        && person.motherName !== null
        && person.fatherName !== null
      )
        && (person.name
          .toLowerCase().includes(appliedQuery)
          || person.motherName
            .toLowerCase().includes(appliedQuery)
          || person.fatherName
            .toLowerCase().includes(appliedQuery)));
  } else {
    filteredPeople = people;
  }

  return (
    <>
      <div className="title__container">
        <h1 className="title">People page</h1>
      </div>
      <div className="input__container">
        <label className="label" id="name">
          <input
            data-cy="filterInput"
            value={query}
            onChange={handleQueryChange}
            className="input is-normal"
            type="text"
            name="input"
            placeholder="Enter name"
          />
        </label>
        <div>
          <button type="button" className="button button-add">
            <Link
              to="/people/new"
            >
              Add person
            </Link>
          </button>
        </div>
      </div>
      <PeopleTable people={filteredPeople} />
    </>
  );
};
