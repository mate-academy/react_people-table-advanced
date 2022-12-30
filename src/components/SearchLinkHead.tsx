import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const SearchLinkHead: React.FC<{ title: string }> = ({ title = '' }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const lowerCaseTitle = title.toLowerCase();
  let params;

  switch (!!title) {
    case (!sort && !order):
    case (sort && sort !== lowerCaseTitle && !order):
      params = { sort: lowerCaseTitle };
      break;
    case (sort && sort === lowerCaseTitle && !order):
      params = { order: 'desc' };
      break;
    default:
      params = { sort: null, order: null };
  }

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i className={classNames(
          'fas',
          { 'fa-sort': sort !== lowerCaseTitle },
          { 'fa-sort-up': sort === lowerCaseTitle && !order },
          { 'fa-sort-down': sort === lowerCaseTitle && order },
        )}
        />
      </span>
    </SearchLink>
  );
};
