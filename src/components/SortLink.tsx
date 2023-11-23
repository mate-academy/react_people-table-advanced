import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { usePeople } from '../store/PeopleContext';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type SortBy = keyof Person;

type Props = {
  sortField: SortBy;
  children: React.ReactNode;
};

export const SortLink: React.FC<Props> = ({ sortField, children }) => {
  const {
    sort,
    order,
  } = usePeople();

  const currentField = sort === sortField;
  const descOrder = order === 'desc';

  const params: SearchParams = {
    sort: currentField && descOrder ? null : sortField,
    order: currentField && !descOrder ? 'desc' : null,
  };
  const sortClassName = classNames('fas', {
    'fa-sort': !sort && !order,
    'fa-sort-up': currentField && !order,
    'fa-sort-down': currentField && order,
  });

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {children}
      <SearchLink
        params={params}
      >
        <span className="icon">
          <i className={sortClassName} />
        </span>
      </SearchLink>
    </span>
  );
};
