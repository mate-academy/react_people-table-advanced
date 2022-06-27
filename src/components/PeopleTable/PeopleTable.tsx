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
  const sortQuery = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const handleSort = (event: React.MouseEvent) => {
    const sortBy = event.currentTarget.textContent?.toLowerCase();

    if (sortBy) {
      setSearchParams({ sortBy, sortOrder });
    } else {
      setSearchParams({});
    }

    if (sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    sortTable(sortQuery, sortOrder);
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
