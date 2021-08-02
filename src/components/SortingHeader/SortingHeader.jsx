import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'bulma';
import './SortingHeader.scss';

const sortingOrders = {
  name: 'asc',
  sex: 'asc',
  born: 'asc',
  died: 'asc',
};

export const SortingHeader = ({ header, sortingHeaders }) => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const sortByHeader = searchParams.get('sortBy');

  let pathToIcon = 'https://raw.githubusercontent.com/Artem20201610/react_people-table-advanced/master/public/images/sort_asc.png';

  if (header.toLowerCase() === sortByHeader) {
    pathToIcon = sortingOrders[header.toLowerCase()] === 'asc'
      ? 'https://raw.githubusercontent.com/Artem20201610/react_people-table-advanced/master/public/images/sort_asc.png'
      : 'https://raw.githubusercontent.com/Artem20201610/react_people-table-advanced/master/public/images/sort_desc.png';
  }

  const handleClick = () => {
    if (sortingHeaders.includes(header)) {
      const sortOrder = sortingOrders[header.toLowerCase()];

      sortingOrders[header.toLowerCase()] = sortOrder === 'asc'
      ? 'desc'
      : 'asc';

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
