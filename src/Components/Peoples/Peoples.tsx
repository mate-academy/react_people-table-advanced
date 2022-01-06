import React, { useCallback, useState } from 'react';
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { debounce } from 'lodash';
import { PersonRow } from '../PersonRow/PersonRow';
import { People } from '../../types/People';
import './Peoples.scss';
import { NewPerson } from '../NewPerson/NewPerson';

type Props = {
  people: People[],
  setPeople: (people: People[]) => void,
};

export const Peoples:React.FC<Props> = ({ people, setPeople }) => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(useLocation().search);

  const aplliedQuery = searchParams.get('query')?.toLowerCase() || '';
  let visiblePeople = people.filter(person => (
    person.name.toLowerCase().includes(aplliedQuery)
    || person.fatherName?.toLowerCase().includes(aplliedQuery)
    || person.motherName?.toLowerCase().includes(aplliedQuery)
  ));

  const [query, setQuery] = useState(aplliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate({
        search: searchParams.toString(),
      });
    }, 500),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  const sortOrder = searchParams.get('sortOrder')?.toString();
  const sortBy = searchParams.get('sortBy')?.toString();

  const handleSortChage = (value: string) => {
    if (sortOrder === 'asc' && sortBy === value) {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', value);

    navigate({
      search: searchParams.toString(),
    });
  };

  const sortClassNames = (value: string) => {
    if (sortOrder === 'desc' && sortBy === value) {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  if (sortBy) {
    visiblePeople = visiblePeople.sort((a, b): number => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return sortOrder === 'asc'
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);
        case 'born':
        case 'died':
          return sortOrder === 'asc'
            ? +a[sortBy] - +b[sortBy]
            : +b[sortBy] - +a[sortBy];
        default:
          return 0;
      }
    });
  }

  return (
    <div className="peoples">
      <h3 className="title is-3">People</h3>

      <div className="table-header">
        <input
          className="input is-normal"
          type="search"
          value={query}
          placeholder="Filter people"
          onChange={handleQueryChange}
        />

        <NavLink
          to="/people/new"
          type="button"
          className="button is-normal"
        >
          Add a person
        </NavLink>
      </div>

      <Routes>
        <Route path="/new" element={<NewPerson people={people} setPeople={setPeople} />} />
      </Routes>

      <table className="table is-narrow">
        <thead>
          <tr>
            <th
              className="table__header-link"
              onClick={() => {
                handleSortChage('name');
              }}
            >
              Name
              <i className={`fas ${sortClassNames('name')}`} />
            </th>

            <th
              className="table__header-link"
              onClick={() => {
                handleSortChage('sex');
              }}
            >
              Sex
              <i className={`fas ${sortClassNames('sex')}`} />
            </th>

            <th
              className="table__header-link"
              onClick={() => {
                handleSortChage('born');
              }}
            >
              Born
              <i className={`fas ${sortClassNames('born')}`} />
            </th>

            <th
              className="table__header-link"
              onClick={() => {
                handleSortChage('died');
              }}
            >
              Died
              <i className={`fas ${sortClassNames('died')}`} />
            </th>
            <th>Father</th>
            <th>Mother</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <PersonRow person={person} key={person.slug} people={people} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
