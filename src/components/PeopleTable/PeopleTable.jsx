import './PeopleTable.scss';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable = ({ people }) => {
  let sortedPeople;
  const columnsNames = ['Name', 'Sex', 'Born', 'Died'];
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const handleSortBy = (column) => {
    searchParams.set('sortBy', column);
    searchParams.set('sortOrder', sortOrder !== 'asc' ? 'asc' : 'desc');

    navigate(`?${searchParams.toString()}`);
  };

  if (sortBy) {
    sortedPeople = people.sort((a, b) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          switch (sortOrder) {
            case 'asc':
              return a[sortBy].localeCompare(b[sortBy]);
            default:
              return b[sortBy].localeCompare(a[sortBy]);
          }

        case 'born':
        case 'died':
          switch (sortOrder) {
            case 'asc':
              return a[sortBy] - b[sortBy];
            default:
              return b[sortBy] - a[sortBy];
          }

        default:
          return 0;
      }
    });
  } else {
    sortedPeople = people;
  }

  return (
    <>
      <table className="table">
        <thead className="table__headers">
          <tr>
            {columnsNames.map(column => (
              <th
                className={classNames('sortBy__item',
                  { sortBy__item_sort_asc: sortOrder === 'asc'
                    && sortBy === column.toLowerCase(),
                  sortBy__item_sort_desc: sortOrder === 'desc'
                    && sortBy === column.toLowerCase(),
                  sorted_column: sortBy === column.toLowerCase() })}
                onClick={() => handleSortBy(column.toLowerCase())}
              >
                {column}
              </th>
            ))}
            <th className="">Mother</th>
            <th className="">Father</th>
          </tr>
        </thead>
        <tbody>
          {sortedPeople.map(person => (
            <PersonRow
              {...person}
              mother={people
                .find(value => person.motherName === value.name) || 'no data'}
              father={people
                .find(value => person.fatherName === value.name) || 'no data'}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
      born: PropTypes.number,
      died: PropTypes.number,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
      slug: PropTypes.string,
    }),
  ).isRequired,
};
