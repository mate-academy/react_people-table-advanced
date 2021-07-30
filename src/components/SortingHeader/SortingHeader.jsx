import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'bulma';
import './SortingHeader.scss';

export const SortingHeader = ({ header, sortingHeaders }) => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const sortOrderParam = searchParams.get('sortOrder');
  const sortByHeader = searchParams.get('sortBy');
  let sortOrder;

  if (sortOrderParam) {
    sortOrder = sortOrderParam === 'asc' ? 'desc' : 'asc';
  } else {
    sortOrder = 'asc';
  }

  let pathToIcon = 'https://raw.githubusercontent.com/Artem20201610/react_people-table-advanced/master/public/images/sort_asc.png';

  if (header.toLowerCase() === sortByHeader) {
    pathToIcon = sortOrder === 'asc'
      ? 'https://raw.githubusercontent.com/Artem20201610/react_people-table-advanced/master/public/images/sort_desc.png'
      : 'https://raw.githubusercontent.com/Artem20201610/react_people-table-advanced/master/public/images/sort_asc.png';
  }

  const handleClick = () => {
    if (sortingHeaders.includes(header)) {
      searchParams.set('sortBy', header.toLowerCase());
      searchParams.set('sortOrder', sortOrder);
      history.push({
        search: searchParams.toString(),
      });
    }
  };

  return (
    <th
      onClick={handleClick}
    >
      {`${header}${searchParams.get('sortBy') === header.toLowerCase()
        ? '*'
        : ''}`}
      {(sortingHeaders.includes(header))
        ? <img alt="sort order" src={pathToIcon} />
        : ''}
    </th>
  );
};

SortingHeader.propTypes = {
  header: PropTypes.string.isRequired,
  sortingHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
};
