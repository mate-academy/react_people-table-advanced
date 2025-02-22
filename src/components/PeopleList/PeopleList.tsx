import React, { useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
  personId: string;
  getFather: (name: string | null) => Person | undefined;
  getMother: (name: string | null) => Person | undefined;
};
const COLUMN_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type SortableFields = 'name' | 'sex' | 'born' | 'died';

export const PeopleList: React.FC<Props> = ({
  people,
  personId,
  getFather,
  getMother,
}) => {
  const [sortField, setSortField] = useState<SortableFields | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const toggleSortOrder = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortOrder(null);
      setSortField(null);
    } else {
      setSortOrder('asc');
    }
  };

  const sortPeople = (field: SortableFields) => {
    if (sortField === field) {
      toggleSortOrder();
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...people].sort((a, b) => {
    if (sortField) {
      if (a[sortField] < b[sortField]) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (a[sortField] > b[sortField]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
    }

    return 0;
  });
  const orderDirection = sortOrder === 'asc' ? 'desc' : null;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_HEADERS.map(header => (
            <th key={header}>
              <span
                className="is-flex is-flex-wrap-nowrap"
                onClick={() =>
                  sortPeople(header.toLowerCase() as SortableFields)
                }
              >
                {header}
                {header !== 'Mother' && header !== 'Father' && (
                  <SearchLink
                    params={{
                      sort: header.toLowerCase(),
                      order: orderDirection,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={`fas fa-sort${sortField === header.toLowerCase() ? '-' + sortOrder : ''}`}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData.map(person => (
          <PeopleTable
            person={person}
            personId={personId}
            key={person.slug}
            getFather={getFather}
            getMother={getMother}
          />
        ))}
      </tbody>
    </table>
  );
};
