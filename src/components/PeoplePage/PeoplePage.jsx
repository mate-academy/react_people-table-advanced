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
  const filterBy = searchParams.get('filterBy') || '';

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

  const handleFilterBy = (event) => {
    searchParams.set('filterBy', event.target.value);

    navigate(`?${searchParams.toString()}`);
  };

  if (appliedQuery && filterBy) {
    filteredPeople = people
      .filter(person => person[filterBy] !== null
        && person[filterBy]
          .toLowerCase().includes(appliedQuery));
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
        <div className="select">
          <select
            className="select"
            onChange={handleFilterBy}
          >
            <option defaultValue="filter by" hidden>Filter by:</option>
            <option value="name">Name</option>
            <option value="motherName">Mother&apos;s Name</option>
            <option value="fatherName">Father&apos;s Name</option>
          </select>
        </div>
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
