import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  title: string;
}

export const SortLink: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sortLowerCase = title.toLowerCase();
  const withOrder = sortLowerCase === sort && order === 'desc';
  const withoutOrder = sortLowerCase === sort && !order;

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <SearchLink
        params={{
          sort: withOrder
            ? null
            : sortLowerCase,
          order: withoutOrder
            ? 'desc'
            : null,
        }}
      >
        <span className="icon">
          <i className={classNames(
            'fas fa-sort',
            { 'fa-sort-up': withoutOrder },
            { 'fa-sort-down': withOrder },
          )}
          />
        </span>
      </SearchLink>
    </span>
  );
};
