/* eslint-disable no-else-return */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { UserType } from '../../HelpTools/types';
import { sortPeople } from '../../HelpTools/PeopleSort';
import { PersonRow } from '../PersonRow';
import './PeopleTable.css';

export const PeopleTable = ({ people, onSort }) => {
  const tableHead = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
  const noSorted = 'MotherFather';
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const [orderChange, setOrderChange] = useState(false);
  const updateOrder = useCallback((currentSortBy, column) => {
    if (orderChange === false) {
      setOrderChange(!orderChange);

      return 'asc';
    } else if (currentSortBy !== column) {
      return 'asc';
    } else {
      setOrderChange(!orderChange);

      return 'desc';
    }
  }, [orderChange]);

  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          {tableHead.map(col => (
            <th
              key={col}
            >
              <button
                type="button"
                onClick={() => onSort(prev => (
                  {
                    sortBy: col,
                    sortOrder: updateOrder(prev.sortBy, col),
                  }))
              }
                className="button is-normal"
                disabled={noSorted.includes(col)}
              >
                <span>{col}</span>
                {!noSorted.includes(col) && (
                  <span className="icon">
                    <i
                      className={ClassNames('fas', {
                        'fa-sort-up': sortOrder === 'asc' && sortBy === col,
                        'fa-sort-down': sortOrder === 'desc' && sortBy === col,
                        'fa-sort': sortBy !== col,
                      })}
                    />
                  </span>
                )}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortPeople(people, sortBy, sortOrder).map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape(UserType)).isRequired,
  onSort: PropTypes.func.isRequired,
};
