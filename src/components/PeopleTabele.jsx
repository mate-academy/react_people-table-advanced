import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { PersonRow } from './PersonRow';
import '../App.scss';

// eslint-disable-next-line
const ascImg = `https://raw.githubusercontent.com/Vasilkoff/react_people-table-advanced/master/public/images/sort_asc.png`;
// eslint-disable-next-line
const descImg = `https://raw.githubusercontent.com/Vasilkoff/react_people-table-advanced/master/public/images/sort_desc.png`;

export function PeopleTable({ people, onSortBy }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  return (
    <table className="PeopleTable">
      <thead
        aria-hidden
        onClick={event => onSortBy(event)}
        onKeyDown={event => onSortBy(event)}
      >
        <th className="list-item" data-name="name">
          <img
            src={sortOrder === 'desc' && sortBy === 'name' ? descImg : ascImg}
            alt="sortImg"
          />
          {sortBy === 'name' ? <span>name*</span> : 'name'}
        </th>
        <th className="list-item" data-name="sex">
          <img
            src={sortOrder === 'desc' && sortBy === 'sex' ? descImg : ascImg}
            alt="sortImg"
          />
          {sortBy === 'sex' ? <span>sex*</span> : 'sex'}
        </th>
        <th className="list-item" data-name="born">
          <img
            src={sortOrder === 'desc' && sortBy === 'born' ? descImg : ascImg}
            alt="sortImg"
          />
          {sortBy === 'born' ? <span>born*</span> : 'born'}
        </th>
        <th className="list-item" data-name="died">
          <img
            src={sortOrder === 'desc' && sortBy === 'died' ? descImg : ascImg}
            alt="sortImg"
          />
          {sortBy === 'died' ? <span>died*</span> : 'died'}
        </th>
        <th className="list-item" data-name="motherName">
          <img
            src={
              sortOrder === 'desc' && sortBy === 'motherName' ? descImg : ascImg
            }
            alt="sortImg"
          />
          motherName
        </th>
        <th className="list-item" data-name="fatherName">
          <img
            src={
              sortOrder === 'desc' && sortBy === 'fatherName' ? descImg : ascImg
            }
            alt="sortImg"
          />
          fatherName
        </th>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow person={person} />
        ))}
      </tbody>
    </table>
  );
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSortBy: PropTypes.func.isRequired,
};
