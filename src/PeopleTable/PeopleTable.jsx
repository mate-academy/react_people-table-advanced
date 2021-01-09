import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { PersonName } from '../PersonName';
import { getPeople, makeName } from '../helpers/Helpers';
import { NewPerson } from '../NewPerson/NewPerson';

export const PeopleTable = () => {
  const [people, setPeople] = useState([]);
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

  const changeQuery = ({ value }) => {
    setQuery(value);
    applyQuery(value);
  };

  useEffect(() => {
    if (applyiedQuery) {
      getPeople().then(res => setPeople(res
        .filter(person => person.name.toLowerCase()
          .includes(applyiedQuery.toLowerCase()))));
    } else {
      getPeople().then(setPeople);
    }
  }, [applyiedQuery]);

  const handleClick = (item) => {
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
    }

    history.push(`?${searchParams}`);
  };

  const setImg = val => (
    `images/sort_${
      !sortBy || sortBy !== val
        ? 'both'
        : `${sortBy === val && sortOrder === 'asc'
          ? 'asc'
          : 'desc'}`}.png`
  );

  const sortTable = (item) => {
    const order = searchParams.get('sortOrder');
    const bySort = searchParams.get('sortBy');

    if (bySort && item === bySort) {
      setPeople([...people].sort((a, b) => {
        if (bySort === 'name' || bySort === 'sex') {
          return order === 'asc' || !order
            ? a[bySort].localeCompare(b[bySort])
            : b[bySort].localeCompare(a[bySort]);
        }

        if (bySort === 'born' || bySort === 'died') {
          return order === 'asc' || !order
            ? a[bySort] - b[bySort]
            : b[bySort] - a[bySort];
        }

        return '';
      }));
    }
  };

  return (
    <>
      <NewPerson people={people} setPeople={setPeople} />
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
            {['name', 'sex', 'born', 'died', 'mother', 'father'].map(item => (
              <th key={item} className="Person person">
                <button
                  key={item}
                  type="button"
                  className={classNames('button', 'Person', {
                    active: item === sortBy,
                  })}
                  onClick={() => {
                    handleClick(item);
                    sortTable(item);
                  }}
                >
                  {item !== 'mother' && item !== 'father'
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
          <PersonName people={people} />
        </tbody>
      </table>
    </>
  );
};
