/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import className from 'classnames';
import uniqueKey from 'unique-key';

import { Table } from 'semantic-ui-react';
import { PersonName } from '../PersonName';

export const PeopleTable = ({ people, handleSort }) => {
  const [activeRow, setActiveRow] = useState('');
  const { search } = useLocation();

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            className="sort"
            onClick={() => handleSort('name')}
          >
            <NavLink
              to={`/people/sortBy=name?${search}`}
            >
              Name
            </NavLink>
          </Table.HeaderCell>
          <Table.HeaderCell
            className="sort"
            onClick={() => handleSort('sex')}
          >
            <NavLink
              to={`/people/sortBy=sex?${search}`}
            >
              Sex
            </NavLink>
          </Table.HeaderCell>
          <Table.HeaderCell
            className="sort"
            onClick={() => handleSort('born')}
          >
            <NavLink
              to={`/people/sortBy=born?${search}`}
            >
              Born
            </NavLink>
          </Table.HeaderCell>
          <Table.HeaderCell
            className="sort"
            onClick={() => handleSort('died')}
          >
            <NavLink
              to={`/people/sortBy=died?${search}`}
            >
              Died
            </NavLink>
          </Table.HeaderCell>
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
                  : '')}
            key={person.slug}
          >
            <Table.Cell>
              <NavLink
                key={uniqueKey(6)}
                to={`/people/:person=${person.slug}?${search}`}
                onClick={() => setActiveRow(person.slug)}
              >
                <PersonName
                  key={uniqueKey(`${5}`)}
                  name={person.name}
                />
              </NavLink>
            </Table.Cell>
            <Table.Cell key={uniqueKey(`${1}`)}>{person.sex}</Table.Cell>
            <Table.Cell key={uniqueKey(`${2}`)}>{person.born}</Table.Cell>
            <Table.Cell key={uniqueKey(`${3}`)}>{person.died}</Table.Cell>
            <Table.Cell key={uniqueKey(`${4}`)}>{person.motherName}</Table.Cell>
            <Table.Cell key={uniqueKey(`${4}`)}>{person.fatherName}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string.isRequired,
      born: PropTypes.number.isRequired,
      died: PropTypes.number.isRequired,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
    }),
  ).isRequired,
  handleSort: PropTypes.func.isRequired,
};
