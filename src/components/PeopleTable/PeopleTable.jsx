import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow';
import { PeopleTableHeader } from '../PeopleTableHeader';

export const PeopleTable = ({ people, selectedPersonSlug }) => (
  <table
    style={{
      tableRowActiveColor: 'red',
      borderCollapse: 'collapse',
    }}
    className="table is-hoverable"
  >
    <thead>
      <tr>
        <PeopleTableHeader
          title="name"
        />
        <PeopleTableHeader
          title="sex"
        />
        <PeopleTableHeader
          title="born"
        />
        <PeopleTableHeader
          title="died"
        />
        <th>mother&#39;s name</th>
        <th>father&#39;s name</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonRow
          person={person}
          isSelected={selectedPersonSlug === `:${person.slug}`}
        />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  selectedPersonSlug: PropTypes.string.isRequired,
};
