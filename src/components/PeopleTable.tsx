import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';
import { usePeopleSearchParams } from '../utils/usePeopleSearchParams';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { sortField, order } = usePeopleSearchParams();
  const tableField = ['Name', 'Sex', 'Born', 'Died'];

  const handleSort = (selectedSort: string) => {
    if (selectedSort !== sortField) {
      return { sort: selectedSort, order: null };
    }

    if (selectedSort === sortField && !order) {
      return { sort: selectedSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableField.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <SearchLink params={handleSort(field.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': field.toLowerCase() !== sortField,
                        'fa-sort-up':
                          field.toLowerCase() === sortField && !order,
                        'fa-sort-down':
                          field.toLowerCase() === sortField && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
