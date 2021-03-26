/* eslint-disable no-nested-ternary */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Header } from './types';

export const TableHeader: React.FC<Header > = ({ header }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const clickHandler = () => {
    if (sortOrder === 'ASC') {
      searchParams.set('sortOrder', 'DESC');
    } else {
      searchParams.set('sortOrder', 'ASC');
    }

    searchParams.set('sortBy', header.toLowerCase());
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <th
      className="peopleTable__rowsHeader peopleTable__cell"
      onClick={clickHandler}
    >
      {header}
      {sortBy !== header.toLowerCase()
        ? (
          <span><img src="../images/sort_both.png" alt="not sorted" /></span>
        )
        : (
          sortOrder === 'ASC'
            ? <span><img src="../images/sort_desc.png" alt="sorted DESC" /></span>
            : <span><img src="../images/sort_asc.png" alt="sorted ASC" /></span>
        )}
    </th>
  );
};
