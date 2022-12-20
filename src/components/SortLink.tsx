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
  const withOrder = sortLowerCase === sort && order === 'desc'
    ? null : sortLowerCase;
  const withoutOrder = sortLowerCase === sort && !order
    ? 'desc' : null;

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <SearchLink
        params={{
          sort: withOrder,
          order: withoutOrder,
        }}
      >
        <span className="icon">
          <i className={classNames(
            'fas fa-sort',
            { 'fa-sort-up': sortLowerCase === sort && order !== 'desc' },
            { 'fa-sort-down': sortLowerCase === sort && order === 'desc' },
          )}
          />
        </span>
      </SearchLink>
    </span>
  );
};
