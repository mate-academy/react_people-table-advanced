import React, { useEffect, useState } from 'react';

import { useSearchParams, useLocation } from 'react-router-dom';

type Props = {
  text: string;
  sortParam: string;
};

export const FilterButton: React.FC<Props> = React.memo(
  ({
    text,
    sortParam,
  }) => {
    const [isRevers, setIsRevers] = useState(false);
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(search);

    const sortOrder = searchParams.get('sortOrder');
    const sortBy = searchParams.get('sortBy');

    useEffect(() => {
      if (sortBy !== sortParam) {
        setIsRevers(false);
      }
    }, [sortBy]);

    const src = () => {
      if (sortBy === sortParam) {
        return sortOrder === 'asc'
          ? './images/sort_asc.png'
          : './images/sort_desc.png';
      }

      return './images/sort_both.png';
    };

    return (
      <>
        <button
          type="button"
          className="filter-button"
          onClick={() => {
            setIsRevers(curr => !curr);
            searchParams.set('sortBy', sortParam);
            searchParams.set('sortOrder', isRevers ? 'desc' : 'asc');
            setSearchParams(searchParams);
          }}
        >
          {text}
          <span className="icon">
            <img src={src()} alt="icon" />
          </span>
        </button>
      </>

    );
  },
);
