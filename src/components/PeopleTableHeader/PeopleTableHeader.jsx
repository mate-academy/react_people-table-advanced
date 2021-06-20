import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import sortAsc from '../../images/sort_asc.png';
import sortDesc from '../../images/sort_desc.png';
import sortBoth from '../../images/sort_both.png';

export const PeopleTableHeader = ({ title }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('sortOrder') || 1;
  const sortIcon = order === 'asc'
    ? <img src={sortAsc} alt="" />
    : <img src={sortDesc} alt="" />;

  const selectSortBy = newSortBy => () => {
    if (sortBy === newSortBy) {
      if (order === 'asc') {
        searchParams.set('sortOrder', 'desc');
      } else {
        searchParams.set('sortOrder', 'asc');
      }
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    if (newSortBy) {
      searchParams.set('sortBy', newSortBy);
    } else {
      searchParams.delete('sortBy');
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <th
      className="is-clickable is-unselectable"
      onClick={selectSortBy(title)}
    >
      {title}
      {' '}
      {sortBy === title
        ? sortIcon
        : <img src={sortBoth} alt="*" />}
    </th>
  );
};

PeopleTableHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
