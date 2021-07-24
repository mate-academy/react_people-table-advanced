import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { PersonRow } from './PersonRow';
import '../App.scss';

export function PeopleTable({ people, onSortBy }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  return (
    <table className="PeopleTable">
      <thead
        aria-hidden
      >
        <th
          onClick={() => onSortBy('name')}
          className={`list-item ${
            sortOrder === 'desc' && sortBy === 'name' ? 'descImg' : 'ascImg'
          }`}
          data-name="name"
        >
          {sortBy === 'name' ? <span>name*</span> : 'name'}
        </th>
        <th
          onClick={() => onSortBy('sex')}
          className={`list-item ${
            sortOrder === 'desc' && sortBy === 'sex' ? 'descImg' : 'ascImg'
          }`}
          data-name="sex"
        >
          {sortBy === 'sex' ? <span>sex*</span> : 'sex'}
        </th>
        <th
          onClick={() => onSortBy('born')}
          className={`list-item ${
            sortOrder === 'desc' && sortBy === 'born' ? 'descImg' : 'ascImg'
          }`}
          data-name="born"
        >
          {sortBy === 'born' ? <span>born*</span> : 'born'}
        </th>
        <th
          onClick={() => onSortBy('died')}
          className={`list-item ${
            sortOrder === 'desc' && sortBy === 'died' ? 'descImg' : 'ascImg'
          }`}
          data-name="died"
        >
          {sortBy === 'died' ? <span>died*</span> : 'died'}
        </th>
        <th
          onClick={() => onSortBy('motherName')}
          className={`list-item ${
            sortOrder === 'desc' && sortBy === 'motherName'
              ? 'descImg'
              : 'ascImg'
          }`}
          data-name="motherName"
        >
          motherName
        </th>
        <th
          onClick={() => onSortBy('motherName')}
          className={`list-item ${
            sortOrder === 'desc' && sortBy === 'fatherName'
              ? 'descImg'
              : 'ascImg'
          }`}
          data-name="fatherName"
        >
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
