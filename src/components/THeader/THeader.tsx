import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { ASC, DESC } from '../../utils/constants';
import { HeaderProp } from '../../utils/type';

export const THeader: React.FC<HeaderProp> = ({ header }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const handleSortByChange = (sortType: string): void => {
    if (sortOrder === DESC || sortBy !== sortType) {
      searchParams.set('sortBy', `${sortType}`);
      searchParams.set('sortOrder', ASC);
    } else {
      searchParams.set('sortOrder', DESC);
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <>
      <button
        type="button"
        className="button"
        onClick={() => {
          handleSortByChange(header);
        }}
        style={{ textTransform: 'capitalize' }}
      >
        {header}
        { header !== sortBy
          ? (
            <span>
              <img src="images/sort_both.png" alt="notSorted" />
            </span>
          )
          : (
            <span>
              *
              { sortOrder === ASC
                ? (<img src="images/sort_asc.png" alt="sortAsc" />)
                : (<img src="images/sort_desc.png" alt="sortDesc" />)}
            </span>
          )}
      </button>
    </>
  );
};
