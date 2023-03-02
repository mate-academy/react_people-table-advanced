import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import { ToggleIcon } from '../ToggleIcon/ToggleIcon';
import { Props } from './Props';

export const TableHeaderWithSortIcon: React.FC<Props> = React.memo(({ th }) => {
  const [searchParams] = useSearchParams();
  const sortType = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        <span>{th}</span>
        <SearchLink
          params={{
            sort: order === 'desc'
          && sortType === th ? null : th,

            order: order === null
          && sortType === th ? 'desc' : null,
          }}
        >
          <ToggleIcon th={th} />
        </SearchLink>
      </span>
    </th>
  );
});
