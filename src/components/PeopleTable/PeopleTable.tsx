import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import PersonRow from '../PersonRow';

import './PeopleTable.scss';

type Props = {
  people: Person[],
  sortBy: string | null,
  sortOrder: string | null,
};

export const PeopleTable: React.FC<Props> = ({ people, sortBy, sortOrder }) => {
  const [currentSortBy, setCurrentSortBy] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onSortByChange = (sortType: string) => {
    let currentSortOrder = sortOrder;

    if (currentSortBy !== sortType) {
      setCurrentSortBy(sortType);
      currentSortOrder = null;
    }

    searchParams.set('sortBy', sortType);
    if (currentSortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    setSearchParams(searchParams);
  };

  const columnClasses = (columnName: string): string => {
    return classNames(
      'sort-button',
      { 'sort-button--selected': sortBy === columnName },
    );
  };

  const arrowImage = (columnName: string) => {
    if (sortBy !== columnName) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/sort_both.png`}
          alt="img"
          className="sort-button__arrow"
        />
      );
    }

    if (sortOrder === 'desc') {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/images/sort_asc.png`}
          alt="img"
          className="sort-button__arrow"
        />
      );
    }

    return (
      <img
        src={`${process.env.PUBLIC_URL}/images/sort_desc.png`}
        alt="img"
        className="sort-button__arrow"
      />
    );
  };

  return (
    <table className="PeopleTable">
      <thead>
        <tr className="PeopleTable__head">
          <th
            onClick={() => onSortByChange('name')}
            className={columnClasses('name')}
          >
            Name
            {arrowImage('name')}
          </th>
          <th
            onClick={() => onSortByChange('sex')}
            className={columnClasses('sex')}
          >
            Sex
            {arrowImage('sex')}
          </th>
          <th
            onClick={() => onSortByChange('died')}
            className={columnClasses('died')}
          >
            Born
            {arrowImage('died')}
          </th>
          <th
            onClick={() => onSortByChange('born')}
            className={columnClasses('born')}
          >
            Died
            {arrowImage('born')}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
