import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const TableHeader: React.FC<{
  sortBy: string | null;
  title: string;
  searchParams: URLSearchParams;
}> = ({ sortBy, title, searchParams }) => {
  const [order, setOrder] = useState('asc');
  const history = useHistory();
  const sortByOrder = searchParams.get('sortByOrder');

  const onClick = (e: React.MouseEvent<HTMLTableDataCellElement>): void => {
    const selector = e.currentTarget.attributes.getNamedItem('data-name')
      ?.value;

    if (selector) {
      searchParams.set('sortBy', selector);
      searchParams.set('sortByOrder', order);
      setOrder(order === 'asc' ? 'desc' : 'asc');
      history.push(`?${searchParams.toString()}`);
    }
  };

  const lowerTitle = title.toLocaleLowerCase();

  return (
    <td data-name={title.toLowerCase()} onClick={onClick}>
      <FontAwesomeIcon icon={faSort} />
      <span className="title">
        {title} {sortBy === title.toLowerCase() && '*'}
      </span>
      {sortByOrder === 'asc' && sortBy === lowerTitle && (
        <FontAwesomeIcon icon={faSortUp} />
      )}
      {sortByOrder === 'desc' && sortBy === lowerTitle && (
        <FontAwesomeIcon icon={faSortDown} />
      )}
    </td>
  );
};

export default TableHeader;
