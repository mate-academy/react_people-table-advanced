import React, { useContext, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { PersonRow } from './PersonRow';
import './PeopleTable.scss';
import { PeopleContext } from '../PeopleContext';

export const PeopleTable: React.FC = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { people } = useContext(PeopleContext);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applieQuery
    = debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate(`?${searchParams.toString()}`);
    }, 500);

  const handleInputchange = (e: string) => {
    setQuery(e);
    applieQuery(e);
  };

  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const handleSortTable = (name: string) => {
    searchParams.set('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc');

    if (name) {
      searchParams.set('sortBy', name);
    } else {
      searchParams.delete('sortBy');
    }

    navigate(`?${searchParams.toString()}`);
  };

  const nameOfColumns = ['Name', 'Sex', 'Born', 'Died'];
  const toLowerQuery = appliedQuery.toLowerCase();

  const filterByNameMotherFather
    = people.filter(person => person.name.toLowerCase()
      .includes(toLowerQuery)
      || (person.fatherName !== null
        ? person.fatherName.toLowerCase().includes(toLowerQuery)
        : '')
      || (person.motherName !== null
        ? person.motherName.toLowerCase().includes(toLowerQuery)
        : ''));

  filterByNameMotherFather.sort((a, b) => {
    if (sortBy === 'name' || sortBy === 'sex') {
      if (sortOrder === 'asc') {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }

    if (sortBy === 'born' || sortBy === 'died') {
      if (sortOrder === 'asc') {
        return (+b[sortBy]) - (+a[sortBy]);
      }

      return (+a[sortBy]) - (+b[sortBy]);
    }

    return 0;
  });

  return (
    <div>
      <div className="table-navigation">
        <input
          className="table-navigation__input"
          placeholder="Find People"
          type="text"
          value={query}
          onChange={(e) => handleInputchange(e.target.value)}
        />

        <Link className="table-navigation__addPersonButton" to="/people/new">
          Add Person
        </Link>
      </div>

      <table className="PeopleTable">
        <thead>
          <tr
            className="PeopleTable__thead"
          >
            {nameOfColumns.map(name => (
              <th
                className={classNames('PeopleTable__sort', {
                  'PeopleTable__sort--asc': sortOrder === 'asc'
                    && sortBy === name.toLowerCase(),
                  'PeopleTable__sort--desc': sortOrder === 'desc'
                    && sortBy === name.toLowerCase(),
                })}
                key={name}
                onClick={() => handleSortTable(name.toLowerCase())}
              >
                {name}
              </th>
            ))}
            <th>Father</th>
            <th>Mother</th>
          </tr>
        </thead>
        <tbody>
          {filterByNameMotherFather.map(man => (
            <PersonRow
              person={man}
              key={man.slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
