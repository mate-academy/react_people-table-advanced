import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../SearchLink';

type Props = {
  th: string;
};

export const TableHead: React.FC<Props> = ({ th }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const setParams = (sortType: string) => ({
    sort: sort === sortType && isReversed ? null : sortType,
    order: sort === sortType && !isReversed ? 'desc' : null,
  });

  const formattedTh = th.toLowerCase();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {th}

        <SearchLink params={setParams(formattedTh)}>
          <span className="icon">
            <i
              className={classNames(
                'fas',
                {
                  'fa-sort': sort !== formattedTh,
                  'fa-sort-up': sort === formattedTh && !isReversed,
                  'fa-sort-down': sort === formattedTh && isReversed,
                },
              )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
