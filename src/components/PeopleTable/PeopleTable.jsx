import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { PersonRow } from '../PersonRow';
import { SortingHeader } from '../SortingHeader';
import { PersonType } from '../../types';

import 'bulma';
import './PeopleTable.scss';

const headers = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const sortingHeaders = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        {headers.map(header => (
          <SortingHeader
            header={header}
            sortingHeaders={sortingHeaders}
            key={header}
          />
        ))}
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow
          key={person.slug}
          person={person}
          people={people}
        />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PersonType.isRequired).isRequired,
};
