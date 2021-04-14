/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import className from 'classnames';

import { Table } from 'semantic-ui-react';
import { PersonName } from '../PersonName';

export const PeopleTable = ({ people }) => {
  const [activeRow, setActiveRow] = useState('');

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Sex</Table.HeaderCell>
          <Table.HeaderCell>Born</Table.HeaderCell>
          <Table.HeaderCell>Died</Table.HeaderCell>
          <Table.HeaderCell>Mother</Table.HeaderCell>
          <Table.HeaderCell>Father</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {people.map(person => (
          <Table.Row
            className={className('row',
              activeRow === person.slug && person.sex === 'm'
                ? 'active-row--men'
                : activeRow === person.slug
              && person.sex === 'f'
                  ? 'active-row--women'
                  : '',
            )}
            key={person.slug}
          >
            <Table.Cell>
              <NavLink
                to={`/people/:person=${person.slug}?`}
                onClick={() => setActiveRow(person.slug)}
              >
                <PersonName
                  name={person.name}
                />
              </NavLink>
            </Table.Cell>
            <Table.Cell>{person.sex}</Table.Cell>
            <Table.Cell>{person.born}</Table.Cell>
            <Table.Cell>{person.died}</Table.Cell>
            <Table.Cell>{person.motherName}</Table.Cell>
            <Table.Cell>{person.fatherName}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      born: PropTypes.number.isRequired,
      died: PropTypes.number.isRequired,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
    }),
  ).isRequired,
};
