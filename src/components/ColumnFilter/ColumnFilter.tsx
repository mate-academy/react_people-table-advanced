import React from 'react';
import { SearchLink } from '../SearchLink/SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  columnName: string;
};

export const ColumnFilter: React.FC<Props> = ({ columnName }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const formatedColumnName = columnName.toLocaleLowerCase();

  const params: { sort: string | null; order: string | null } = {
    sort: formatedColumnName,
    order: sort === formatedColumnName ? 'desc' : null,
  };

  if (sort === formatedColumnName && order === 'desc') {
    params.sort = null;
    params.order = null;
  }

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {columnName}
      <SearchLink params={params}>
        <span className="icon">
          <i
            className={classNames('fas', {
              'fa-sort': sort !== formatedColumnName,
              'fa-sort-up': sort === formatedColumnName && !order,
              'fa-sort-down': sort === formatedColumnName && order,
            })}
          ></i>
        </span>
      </SearchLink>
    </span>
  );
};
