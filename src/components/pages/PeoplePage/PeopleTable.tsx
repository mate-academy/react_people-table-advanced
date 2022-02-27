import React, { useState, useMemo, useCallback } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash/debounce';

import classNames from 'classnames';
import './PeopleTable.scss';

import { PersonRow } from './PersonRow';
import { usePeople } from '../../hooks/usePeople';

export const PeopleTable: React.FC = () => {
  const { people } = usePeople();
  const location = useLocation();
  const history = useNavigate();
  const [searchParams] = useSearchParams();

  const nameQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(nameQuery);

  const sortableColumns = ['Name', 'Sex', 'Born', 'Died'];

  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const getVisiblePeople = () => {
    return (
      people.filter((person: Person) => (
        person.name.toLowerCase().includes(nameQuery)
        || person.fatherName?.toLowerCase().includes(nameQuery)
        || person.motherName?.toLowerCase().includes(nameQuery)))
    );
  };

  const visiblePeople = useMemo(
    getVisiblePeople,
    [people, nameQuery],
  );

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery.toLowerCase().trimLeft());
      } else {
        searchParams.delete('query');
      }

      history(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const setSort = (value: string) => {
    searchParams.set('sortBy', value);
    searchParams.set('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc');

    history(`?${searchParams.toString()}`);
  };

  const handleSort = (value: string) => {
    setSort(value);

    visiblePeople.sort((a, b) => {
      switch (value) {
        case 'name':
        case 'sex':
          switch (sortOrder) {
            case 'asc':
              return b[value].localeCompare(a[value]);
            default:
              return a[value].localeCompare(b[value]);
          }

        case 'born':
        case 'died':
          switch (sortOrder) {
            case 'asc':
              return b[value] - a[value];
            default:
              return a[value] - b[value];
          }

        default:
          return 0;
      }
    });
  };

  return (
    <>
      <div className="is-flex is-justify-content-space-between mb-3">
        <p className="control has-icons-left">
          <input
            type="search"
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              applyQuery(event.target.value);
            }}
            placeholder="Find a person"
            className="input"
            style={{ width: '260px' }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
        </p>
        <Link
          to="/people/new"
          className="button is-success"
        >
          Add a person
        </Link>
      </div>

      <table
        className="table is-hoverable"
      >
        <thead>
          <tr>
            {sortableColumns.map(elem => (
              <th
                key={elem}
                className={classNames('table__sort', {
                  'table__sort--asc': sortOrder === 'asc' && sortBy === elem.toLowerCase(),
                  'table__sort--desc': sortOrder === 'desc' && sortBy === elem.toLowerCase(),
                })}
                onClick={() => {
                  handleSort(elem.toLowerCase());
                }}
              >
                {elem}
              </th>
            ))}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => (
            <tr
              id={person.slug}
              key={person.slug}
              className={
                classNames(
                  { 'has-background-warning': location.pathname === `/people/${person.slug}` },
                )
              }
            >
              <PersonRow person={person} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
