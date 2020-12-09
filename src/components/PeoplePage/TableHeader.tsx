import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const TableHeader: React.FC<{
  sortBy: string | null;
  title: string;
  searchParams: URLSearchParams;
}> = ({ sortBy, title, searchParams }) => {
  const [order, setOrder] = useState('asc');
  const history = useHistory();
  const sortByOrder = searchParams.get('sortByOrder');
  const lowerTitle = title.toLocaleLowerCase();

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

  return (
    <td data-name={title.toLowerCase()} onClick={onClick}>
      <span className="title">
        {title} {sortBy === title.toLowerCase() && '*'}
      </span>
      {sortByOrder === 'asc' && sortBy === lowerTitle}
      {sortByOrder === 'desc' && sortBy === lowerTitle}
    </td>
  );
};

export default TableHeader;
