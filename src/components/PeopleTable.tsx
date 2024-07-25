import React from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSortChange = (column: SortBy) => {
    const isCurrentColumn = currentSort === column;
    const newOrder = isCurrentColumn && currentOrder === 'asc' ? 'desc' : 'asc';

    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: column,
      order: newOrder,
    });
  };

  const renderSortArrows = (column: SortBy) => {
    if (currentSort === column) {
      return currentOrder === 'asc' ? (
        <img src="/images/sort_asc.png" alt="Ascending" />
      ) : (
        <img src="/images/sort_desc.png" alt="Descending" />
      );
    }

    return <img src="/images/sort_both.png" alt="Unsorted" />;
  };

  return (
    <table className="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th
            onClick={() => handleSortChange(SortBy.name)}
            style={{ cursor: 'pointer' }}
          >
            Name {renderSortArrows(SortBy.name)}
          </th>
          <th
            onClick={() => handleSortChange(SortBy.sex)}
            style={{ cursor: 'pointer' }}
          >
            Sex {renderSortArrows(SortBy.sex)}
          </th>
          <th
            onClick={() => handleSortChange(SortBy.born)}
            style={{ cursor: 'pointer' }}
          >
            Born {renderSortArrows(SortBy.born)}
          </th>
          <th
            onClick={() => handleSortChange(SortBy.died)}
            style={{ cursor: 'pointer' }}
          >
            Died {renderSortArrows(SortBy.died)}
          </th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <td>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
