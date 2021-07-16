/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import { PersonRow } from './PersonRow';

import sortBoth from '../../images/sort_both.png';
import sortAsc from '../../images/sort_asc.png';
import sortDesc from '../../images/sort_desc.png';

import './PeopleTable.scss';

const heads = ['name', 'sex', 'born', 'died', 'mother', 'father'];

export const PeopleTable = ({ people }) => {
  const match = useRouteMatch();
  const { id } = match.params;
  let newId;

  if (id) {
    newId = id.slice(0, -5).replace(/-/g, ' ');
  }

  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const sortParam = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const [isRev, setRev] = useState(true);

  const sortBy = (event) => {
    const { name } = event.target;

    if (searchParams.get('sortBy') !== name) {
      searchParams.set('sortBy', name);
      history.push({ search: searchParams.toString() });
    }

    toggleSort(name);
  };

  const toggleSort = (name) => {
    if (name === sortParam) {
      setRev(current => !current);
    } else {
      setRev(false);
    }

    if (isRev === true) {
      searchParams.set('sortOrder', 'asc');
    } else {
      searchParams.set('sortOrder', 'desc');
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              {heads.map(head => (
                <th key={`${head}_head`}>
                  <button
                    type="button"
                    className="button"
                    name={head}
                    onClick={sortBy}
                  >
                    {head[0].toUpperCase() + head.slice(1)}
                  </button>
                  <img
                    src={
                      (sortOrder === 'asc' && sortParam === head)
                        ? sortAsc
                        : (sortOrder === 'desc' && sortParam === head)
                          ? sortDesc
                          : sortBoth
                      }
                    alt="sort-png"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr
                key={person.name}
                className={classNames({
                  'highlight-person': person.name === newId,
                })}
              >
                <PersonRow {...person} />
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {heads.map(head => (
                <th key={`${head}_foot`}>
                  {head[0].toUpperCase() + head.slice(1)}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};
