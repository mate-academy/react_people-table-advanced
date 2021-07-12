/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { PersonRow } from './PersonRow';

import sortBoth from '../../images/sort_both.png';
import sortAsc from '../../images/sort_asc.png';
import sortDesc from '../../images/sort_desc.png';

import './PeopleTable.scss';
import { PersonName } from './PersonName';

const heads = ['name', 'sex', 'born', 'died', 'mother', 'father'];

export const PeopleTable = ({ people }) => {
  const match = useRouteMatch();
  const { id } = match.params;

  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const sortParam = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const [isRev, setRev] = useState(false);

  const sortBy = (event) => {
    const { name } = event.target;

    if (name === sortParam) {
      setRev(current => !current);
    } else {
      setRev(false);
    }

    if (isRev) {
      searchParams.set('sortOrder', 'asc');
    } else {
      searchParams.set('sortOrder', 'desc');
    }

    searchParams.set('sortBy', name);
    history.push(`/people/${id}?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="container">
        {(id) && (<PersonName people={people} id={id} />)}
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
