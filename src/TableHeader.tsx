import React, { FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ASC, DESC } from './constants';
import { TableHeaderProps } from './typesDefinitions';

export const TableHeader: FC<TableHeaderProps> = ({ header }) => {
  const history = useHistory(); const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const handlesortByChange = (newsortBy: string): void => {
    if (sortBy !== newsortBy || sortOrder === DESC) {
      searchParams.set('sortBy', `${newsortBy}`);
      searchParams.set('sortOrder', ASC);
    } else {
      searchParams.set('sortOrder', DESC);
    };

    history.push({ search: searchParams.toString() });
  };

  return (
    <>
      <button
        className="cust-btn"
        onClick={() => handlesortByChange(header)}
      >
        {header.toUpperCase()}
        {header !== sortBy
          ? <span><img src="images/sort_both.png" alt="not_sorted"></img></span>
          : <span>*
            {sortOrder === ASC
              ? <img src="images/sort_asc.png" alt="sorted_asc"></img>
              : <img src="images/sort_desc.png" alt="sorted_desc"></img>
            }
          </span>
        }
      </button>
    </>
  );
};
