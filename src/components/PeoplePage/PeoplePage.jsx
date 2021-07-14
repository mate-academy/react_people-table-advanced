import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import debounce from 'lodash/debounce'; // awesome-debounce-promise

import { getPeople } from '../../api';
import { filterPeople, sortPeople } from '../../helpers/peopleHelpers';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const personCols = [
    {
      key: 'name',
      sort: true,
    },
    {
      key: 'sex',
      sort: true,
    },
    {
      key: 'born',
      sort: true,
    },
    {
      key: 'died',
      sort: true,
    },
    {
      key: 'mother',
      sort: false,
    },
    {
      key: 'father',
      sort: false,
    },
  ];

  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const appliedQuery = searchParams.get('query') || '';
  const appliedSortBy = searchParams.get('sortBy') || '';
  const [query, setQuery] = useState(appliedQuery);
  const [sortBy, setSortBy] = useState(appliedSortBy);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getPeople()
      .then((res) => {
        setPeople(res.map((person, index) => ({
          ...person,
          id: index + 1,
          mother: res.find(data => data.name === person.motherName) || null,
          father: res.find(data => data.name === person.fatherName) || null,
        })));
      });
  }, []);

  const updateSearchParams = useCallback((key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    history.push({ search: searchParams.toString() });
  }, []);

  const applyQuery = useCallback(
    debounce((inputQuery) => {
      updateSearchParams('query', inputQuery);
    }, 500), [],
  );

  const handleQueryChange = (e) => {
    const { value } = e.target;

    setQuery(value);
    applyQuery(value);
  };

  const handleClickColumn = (column) => {
    if (column) {
      const newSortOrder = (sortOrder === 'asc') ? 'desc' : 'asc';

      setSortBy(column);
      setSortOrder(newSortOrder);

      updateSearchParams('sortBy', column);
    }
  };

  const filteredPeople = useMemo(() => (
    filterPeople(people, appliedQuery)
  ), [people, appliedQuery]);

  const sortedPeople = useMemo(() => (
    sortPeople(filteredPeople, appliedSortBy)
  ), [filteredPeople, appliedSortBy]);

  const orderedPeople = useMemo(() => {
    if (sortOrder === 'desc') {
      return [...sortedPeople].reverse();
    }

    return sortedPeople;
  }, [sortedPeople, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="App__filter">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter name of a person"
        />

        <i className="icon icon--search" />
      </div>

      <PeopleTable
        people={orderedPeople}
        personCols={personCols}
        sortedBy={sortBy}
        columnOrderDesc={sortOrder === 'desc' ? sortBy : ''}
        clickHandler={handleClickColumn}
      />
    </>
  );
};
