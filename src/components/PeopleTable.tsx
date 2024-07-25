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
      return (
        <span className="icon">
          {currentOrder === 'asc' ? (
            <i className="fas fa-sort-up" />
          ) : (
            <i className="fas fa-sort-down" />
          )}
        </span>
      );
    }

    return (
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    );
  };

  return (
    <table className="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th
            onClick={() => handleSortChange(SortBy.name)}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Name {renderSortArrows(SortBy.name)}
            </span>
          </th>
          <th
            onClick={() => handleSortChange(SortBy.sex)}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Sex {renderSortArrows(SortBy.sex)}
            </span>
          </th>
          <th
            onClick={() => handleSortChange(SortBy.born)}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Born {renderSortArrows(SortBy.born)}
            </span>
          </th>
          <th
            onClick={() => handleSortChange(SortBy.died)}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Died {renderSortArrows(SortBy.died)}
            </span>
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
