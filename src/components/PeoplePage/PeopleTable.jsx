import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { PersonRow } from './PersonRow';

import './PeopleTable.scss';

export const PeopleTable = ({
  people,
  personCols,
  sortedBy,
  columnOrderDesc,
  clickHandler,
}) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        {personCols.map(personCol => (
          <th key={personCol.key}>
            {personCol.sort
              ? (
                <button
                  type="button"
                  className={cn('PeopleTable__sortable', {
                    'PeopleTable__sortable--desc':
                    columnOrderDesc === personCol.key.toLowerCase(),
                  })}
                  onClick={() => clickHandler(personCol.key.toLowerCase())}
                >
                  {personCol.key}
                </button>
              )
              : <span>{personCol.key}</span>
            }
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonRow
          key={person.id}
          person={person}
          mother={person.motherName ? person.motherName : '\u{02212}'}
          father={person.fatherName ? person.fatherName : '\u{02212}'}
        />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.object,
  ),
  personCols: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      sort: PropTypes.bool,
    }),
  ).isRequired,
  sortedBy: PropTypes.string,
  columnOrderDesc: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};

PeopleTable.defaultProps = {
  people: [],
  sortedBy: '',
  columnOrderDesc: '',
};
