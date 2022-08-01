import React, {
  useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';

import { Child } from '../../types/human';
import { SortBy, SortOrder } from '../../types/queryParams';

import { PersonRow } from '../PersonRow';

type Props = {
  people: Child[],
  sortPeople: (arg0: SortBy) => void;
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  sortPeople,
}) => {
  const sortableColumns = [SortBy.Name, SortBy.Sex, SortBy.Born, SortBy.Died];
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  const isSelected = useCallback((columnName) => {
    return columnName === sortBy;
  }, [sortBy]);

  const isSortOrderValid = () => {
    return Object.values(SortOrder).includes(sortOrder as unknown as SortOrder);
  };

  return (
    <table className="PeopleTable table">
      <thead>
        <tr>
          {sortableColumns.map(column => (
            <th
              key={column}
              className="
                PeopleTable__column-title
                PeopleTable__column-title--sortable"
              onClick={() => sortPeople(column)}
            >
              {column}
              {isSelected(column) ? (
                <img
                  src={`images/sort_${isSortOrderValid() ? sortOrder : 'both'}.png`}
                  alt={`sort ${sortOrder || 'both'}`}
                />
              ) : (
                <img
                  src="images/sort_both.png"
                  alt="sort both"
                />
              )}
            </th>
          ))}
          <th className="PeopleTable__column-title">Mother</th>
          <th className="PeopleTable__column-title">Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
});
