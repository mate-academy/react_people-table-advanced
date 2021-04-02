/* eslint-disable no-nested-ternary */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Header } from './types';

const SORTED_HEADERS = ['Name', 'Sex', 'Born', 'Died'];

export const TableHeader: React.FC<Header > = ({ header }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const clickHandler = (newSortBy: string) => {
    if (newSortBy !== sortBy || sortOrder === 'DESC') {
      searchParams.set('sortOrder', 'ASC');
    } else {
      searchParams.set('sortOrder', 'DESC');
    }

    searchParams.set('sortBy', newSortBy);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    SORTED_HEADERS.includes(header)
      ? (
        <th
          className="peopleTable__rowsHeader peopleTable__cell"
          onClick={() => {
            clickHandler(header.toLowerCase());
          }}
        >
          {header}
          {sortBy !== header.toLowerCase()
            ? (
              <span><img src="images/sort_both.png" alt="not sorted" /></span>
            )
            : (
              sortOrder === 'ASC'
                ? <span><img src="images/sort_desc.png" alt="sorted DESC" /></span>
                : <span><img src="images/sort_asc.png" alt="sorted ASC" /></span>
            )}
        </th>
      )
      : (
        <th
          className="peopleTable__rowsHeader peopleTable__cell"
        >
          {header}
        </th>
      )
  );
};
