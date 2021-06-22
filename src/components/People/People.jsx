import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople } from '../../getPeple';
import { PersonRow } from '../PersonRow';
import { NewPerson } from '../NewPerson';

export const People = () => {
  const [people, setPeople] = useState([]);
  const [sort, setSort] = useState('');
  const history = useHistory();
  const [visibleForm, setVisibleForm] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const aplayedQyery = searchParams.get('query') || '';
  const [query, setQuery] = useState(aplayedQyery);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const timeOut = useCallback(
    debounce((text) => {
      if (text) {
        searchParams.set('query', text);
      } else {
        searchParams.delete('query');
      }

      history.push({ search: searchParams.toString() });
    }, 500), [],
  );

  const filterPeople = useMemo(() => (aplayedQyery.trim().length
    ? people.filter(({ name, fatherName, motherName }) => (
      (name + fatherName + motherName).toLowerCase().includes(
        aplayedQyery.toLowerCase(),
      )
    ))
    : people), [aplayedQyery, people]);

  const sortTable = (sortBy) => {
    searchParams.set('sortBy', sortBy);
    searchParams.delete('sortOrder');

    if (sortBy !== sort) {
      searchParams.set('sortOrder', 'asc');
      filterPeople.sort((a, b) => (
        ['sex', 'name'].includes(sortBy) ? a[sortBy].localeCompare(
          b[sortBy],
        ) : +a[sortBy] - +b[sortBy]));
      setSort(sortBy);
    } else {
      searchParams.set('sortOrder', 'desc');
      filterPeople.reverse();
      setSort('');
    }

    history.push({ search: searchParams.toString() });
  };

  const handleChange = (value) => {
    timeOut(value);
    setQuery(value);
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="input-block">
        <input
          value={query}
          onChange={e => handleChange(e.target.value)}
          className="input"
          type="text"
          placeholder="Find..."
        />
      </div>
      {visibleForm && (
        <NewPerson
          people={people}
          setPeople={setPeople}
          setVisibleForm={setVisibleForm}
        />
      )}
      {!visibleForm && (
      <button
        type="button"
        className="button is-success is-rounded"
        onClick={() => setVisibleForm(true)}
      >
        Add person
      </button>
      )}

      <table className="table">
        {filterPeople.length > 0 && (
          <thead>
            <tr>
              <th
                onClick={() => sortTable('name')}
              >
                Name
              </th>
              <th
                onClick={() => sortTable('sex')}
              >
                Sex
              </th>
              <th
                onClick={() => sortTable('born')}
              >
                Born
              </th>
              <th
                onClick={() => sortTable('died')}
              >
                Died
              </th>
              <th>Father</th>
              <th>Mother</th>
            </tr>
          </thead>
        )}
        <tbody>
          {filterPeople.map(person => (
            <PersonRow {...person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
