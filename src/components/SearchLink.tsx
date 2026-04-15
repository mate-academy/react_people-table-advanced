import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

interface Props extends Omit<LinkProps, 'to'> {
  params?: SearchParams;
  to?: string;
}

export const SearchLink: React.FC<Props> = ({ children, params = {}, to, ...props }) => {
  const { search, pathname } = useLocation();
  const newSearch = getSearchWith(new URLSearchParams(search), params);

  return (
    <Link
      {...props}
      to={{
        pathname: to || pathname,
        search: newSearch ? `?${newSearch}` : '',
      }}
    >
      {children}
    </Link>
  );
};
