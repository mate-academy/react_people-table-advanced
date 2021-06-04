import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { PersonRow } from './PersonRow';
import { COLUMNS } from '../helpers/constants';

export const PeopleTable = ({ people, sortedBy, sortOrder, onColumnClick }) => (
  <table
    className="table is-striped is-hoverable"
    style={{ borderCollapse: 'collapse' }}
  >
    <thead>
      <tr>
        {COLUMNS.map((column) => {
          const columnName = column.name.toLowerCase();

          return (
            <th key={column.name}>
              <button
                type="button"
                className={cn('button', 'is-white', {
                  'is-primary is-light': sortedBy === columnName,
                })}
                onClick={() => onColumnClick(columnName)}
                disabled={!column.sort}
              >
                <span>{column.name}</span>

                {column.sort && (
                  <span className="icon is-small">
                    <i className={cn('fas', {
                      'fa-sort-up': sortedBy === columnName
                        && sortOrder === 'asc',
                      'fa-sort-down': sortedBy === columnName
                        && sortOrder === 'desc',
                      'fa-sort': sortedBy !== columnName || !sortOrder,
                    })}
                    />
                  </span>
                )}
              </button>
            </th>
          );
        })}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
    }),
  ),
  onColumnClick: PropTypes.func.isRequired,
  sortedBy: PropTypes.string,
  sortOrder: PropTypes.string,
};

PeopleTable.defaultProps = {
  people: [],
  sortedBy: '',
  sortOrder: '',
};
