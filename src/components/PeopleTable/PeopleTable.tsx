import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './PeopleTable.scss';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[],
  sortTable: (value: string, order: string) => void
};

export const PeopleTable: React.FC<Props> = ({ people, sortTable }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let sortOrder = searchParams.get('sortOrder') || '';
  const query = searchParams.get('query') || '';

  const handleSort = (event: React.MouseEvent) => {
    const sortBy = event.currentTarget.textContent?.toLowerCase() || '';

    if (sortOrder === '') {
      sortOrder = 'desc';
    }

    if (sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
      sortOrder = 'desc';
    } else {
      searchParams.set('sortOrder', 'asc');
      sortOrder = 'asc';
    }

    if (sortBy) {
      setSearchParams({ query, sortBy, sortOrder });
    } else {
      setSearchParams({ query });
    }

    sortTable(sortBy, sortOrder);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th
            className="table__sort"
            onClick={handleSort}
          >
            Name
          </th>
          <th
            className="table__sort"
            onClick={handleSort}
          >
            Sex
          </th>
          <th
            className="table__sort"
            onClick={handleSort}
          >
            Born
          </th>
          <th
            className="table__sort"
            onClick={handleSort}
          >
            Died
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.name}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
