import React from 'react';
import PropTypes from 'prop-types';

import { PersonRow } from './PersonRow';
import { COLUMNS } from '../helpers/constants';

export const PeopleTable = ({ people, onColumnClick }) => (
  <table
    className="table is-striped is-hoverable"
    style={{ borderCollapse: 'collapse' }}
  >
    <thead>
      <tr>
        {COLUMNS.map(column => (
          <th key={column.name}>
            <button
              type="button"
              className="button is-white"
              onClick={() => onColumnClick(column.name.toLowerCase())}
              disabled={!column.sort}
            >
              <span>{column.name}</span>
              {column.sort && (
                <span className="icon is-small">
                  <i className="fas fa-sort" />
                </span>
              )}
            </button>
          </th>
        ))}
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
};

PeopleTable.defaultProps = {
  people: [],
};
