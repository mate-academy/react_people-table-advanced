import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow';
import { PeopleTableHeader } from '../PeopleTableHeader';

export const PeopleTable = ({ people, selectedPersonSlug }) => (
  <table
    style={{
      'table-row-active-color': 'red',
      'border-collapse': 'collapse',
    }}
    className="table is-hoverable"
  >
    <thead>
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
  selectedPersonSlug: PropTypes.number.isRequired,
};
