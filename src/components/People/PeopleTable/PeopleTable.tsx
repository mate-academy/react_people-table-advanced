import React, { useEffect, useState, useCallback } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import { PeopleRow } from '../PeopleRow/PeopleRow';
import { Person } from '../../../types/Person';
import { AddPerson } from '../AddPerson/AddPerson';

import './PeopleTable.scss';

interface Props {
  people: Person[],
  setPeople: (people: Person[]) => void,
}

export const PeopleTable: React.FC<Props> = ({ people, setPeople }) => {
  const body = document.querySelector('body');

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [currentLocation, setcurrentLocation] = useState(location.pathname);

  const appliedQuery = searchParams.get('query')?.toLowerCase() || '';

  const [query, setQuery] = useState(appliedQuery);

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
    }, 500), [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const visiblePeople = people.filter(person => (
    person.name.toLowerCase().includes(appliedQuery))
      || person.motherName?.toLowerCase().includes(appliedQuery)
      || person.fatherName?.toLowerCase().includes(appliedQuery));

  const sortOrder = searchParams.get('sortOrder')?.toString();
  const sortBy = searchParams.get('sortBy')?.toString();

  const handleSort = (event: React.MouseEvent<HTMLElement>) => {
    const value = (event.target as Element).innerHTML;

    if ((!sortOrder || sortOrder === 'asc') && sortBy === value) {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    searchParams.set('sortBy', value);

    navigate({
      search: searchParams.toString(),
    });
  };

  if (sortBy) {
    visiblePeople.sort((a, b): number => {
      switch (sortBy) {
        case 'Name':
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'Sex':
          return sortOrder === 'asc'
            ? a.sex.localeCompare(b.sex)
            : b.sex.localeCompare(a.sex);
        case 'Born':
          return sortOrder === 'asc'
            ? +a.born - +b.born
            : +b.born - +a.born;
        case 'Died':
          return sortOrder === 'asc'
            ? +a.died - +b.died
            : +b.died - +a.died;
        default:
          return -1;
      }
    });
  }

  useEffect(() => {
    if (body && currentLocation.includes('/add')) {
      body.style.overflow = 'hidden';
      setQuery('');
      setcurrentLocation(location.pathname);
    } else if (body) {
      body.style.overflow = 'visible';
      setcurrentLocation(location.pathname);
    }
  });

  const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    <div className="peopleTable">
      <h1 className="peopleTable__header">
        PEOPLE
      </h1>

      <div className="peopleTable__tools">
        <input
          type="text"
          value={query}
          className="peopleTable__search"
          placeholder="Find Person"
          onChange={handleQueryChange}
        />
        <button
          type="button"
          className="peopleTable__clear_query"
          onClick={() => {
            setQuery('');
            navigate('/people');
          }}
        >
          X
        </button>
        <Link
          to="add"
          type="button"
          className="peopleTable__add"
          onClick={scrollToTop}
        >
          Add New Person
        </Link>
      </div>

      <Routes>
        <Route path="/add/" element={<AddPerson people={visiblePeople} setPeople={setPeople} />} />
      </Routes>

      <table className="peopleTable__table">
        <thead className="peopleTable__table__head">
          <tr>
            <th
              id="person_name"
              onClick={handleSort}
            >
              Name
            </th>
            <th onClick={handleSort}>
              Sex
            </th>
            <th onClick={handleSort}>
              Born
            </th>
            <th onClick={handleSort}>
              Died
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody className="peopleTable__people">
          {visiblePeople.map(person => (
            <PeopleRow
              people={visiblePeople}
              person={person}
              key={person.slug}
              isSorted={sortBy}
            />
          ))}
        </tbody>
      </table>

      <button
        className="peopleTable__return-to-top"
        type="button"
        onClick={scrollToTop}
      >
        &#8682;
      </button>
    </div>
  );
};
