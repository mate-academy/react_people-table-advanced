import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { PersonName } from '../PersonName';
import { getPeople, makeName } from '../helpers/Helpers';
import { NewPerson } from '../NewPerson/NewPerson';

export const PeopleTable = () => {
  const [people, setPeople] = useState([]);
  const [peopleNew, setPeopleNew] = useState([]);
  const [personNew, setPersonNew] = useState({});
  const [visiblePeople, setVisiblePeople] = useState([]);
  const [initial, setInitial] = useState('');

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const applyiedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(applyiedQuery);
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  const applyQuery = useCallback(
    debounce((newQuery) => {
      newQuery.trimStart()
        ? searchParams.set('query', newQuery)
        : searchParams.delete('query');
      history.push(`?${searchParams}`);
    }, 500),
    [],
  );

  const changeQuery = useCallback(({ value }) => {
    setQuery(value);
    applyQuery(value);
  }, [applyQuery]);

  useEffect(() => {
    getPeople().then(setPeople);
    getPeople().then(setPeopleNew);
  }, []);

  useEffect(() => {
    if (applyiedQuery) {
      setVisiblePeople((personNew ? peopleNew : people)
        .filter(person => person.name.toLowerCase()
          .includes(applyiedQuery.toLowerCase())));
    } else {
      setVisiblePeople(personNew ? peopleNew : people);
    }
  }, [applyiedQuery, personNew, people, peopleNew]);

  useMemo(() => {
    let result;

    if (sortOrder === 'asc') {
      switch (sortBy) {
        case 'name':
        case 'sex':
          result = visiblePeople.sort((a, b) => (
            a[sortBy].localeCompare(b[sortBy])));
          break;
        case 'born':
        case 'died':
          result = visiblePeople.sort((a, b) => (
            a[sortBy] - b[sortBy]));
          break;
        default:
      }
    }

    if (sortOrder === 'desc') {
      result = visiblePeople.reverse();
    }

    return result;
  }, [sortOrder, sortBy, visiblePeople]);

  const handleClick = useCallback((item) => {
    searchParams.set('sortBy', item);
    if (initial === item) {
      searchParams.set('sortOrder', 'desc');
      setInitial('');
    } else {
      searchParams.set('sortOrder', 'asc');
      setInitial(item);
    }

    if (item === 'mother' || item === 'father') {
      searchParams.delete('sortOrder');
      searchParams.delete('sortBy');
    }

    history.push(`?${searchParams}`);
  }, [searchParams, history, initial]);

  const setImg = useCallback(val => `images/sort_${
    sortBy !== val
      ? 'both'
      : `${sortBy === val && sortOrder === 'asc'
        ? 'asc'
        : 'desc'}`}.png`, [sortBy, sortOrder]);

  const tableFields = ['name', 'sex', 'born', 'died', 'mother', 'father'];

  return (
    <ol>
      <NewPerson
        people={people}
        setPersonNew={setPersonNew}
        setPeopleNew={setPeopleNew}
        peopleNew={peopleNew}
        setPeople={setPeople}
      />
      <input
        type="text"
        className="input_filter"
        placeholder="Enter name"
        value={query.trimStart()}
        onChange={e => changeQuery(e.target)}
      />
      <table className="PeopleTable">
        <thead className="Person">
          <tr className="header">
            {tableFields.map(item => (
              <th key={item} className="Person person">
                <button
                  key={item}
                  type="button"
                  className={classNames('button', 'Person', {
                    active: item === sortBy,
                  })}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {tableFields.slice(0, 4).includes(item)
                    ? (
                      <img
                        src={setImg(item)}
                        alt="sortBy"
                        className={classNames('img', {
                          active: item === sortBy,
                          color_img: sortBy === item,
                        })}
                      />
                    ) : ''}
                  {item === sortBy
                    ? `${makeName(item)}${item === 'mother'
                      || item === 'father' ? '' : '*'}`
                    : makeName(item)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="Person">
          <PersonName visiblePeople={visiblePeople} />
        </tbody>
      </table>
    </ol>
  );
};
