import React from 'react';
import PropTypes from 'prop-types';

import { PersonRow } from './PersonRow';

const COLUMNS = [
  'Name', 'Sex', 'Born', 'Died', 'Mother', 'Father',
];

export const PeopleTable = ({ people }) => (
  <table
    className="table is-striped is-hoverable"
    style={{ borderCollapse: 'collapse' }}
  >
    <thead>
      <tr>
        {COLUMNS.map(column => (
          <th key={column}>
            {column}
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
};

PeopleTable.defaultProps = {
  people: [],
};
