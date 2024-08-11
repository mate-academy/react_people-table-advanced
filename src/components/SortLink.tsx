import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type SortLinkProps = {
  field: string;
};

export const SortLink: React.FC<SortLinkProps> = ({ field }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const handleSort = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sortField === field) {
      if (isReversed) {
        newParams.delete('sort');
        newParams.delete('order');
      } else {
        newParams.set('order', 'desc');
      }
    } else {
      newParams.set('sort', field);
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  return (
    <span onClick={handleSort} style={{ cursor: 'pointer' }}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortField !== field,
            'fa-sort-up': sortField === field && !isReversed,
            'fa-sort-down': sortField === field && isReversed,
          })}
        />
      </span>
    </span>
  );
};
