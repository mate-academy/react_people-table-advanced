import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = LinkProps & {
  params?: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  to,
  params = {},
  children,
  ...props
}) => {
  const { search, pathname } = useLocation();

  const targetPathname = to
    ? typeof to === 'string'
      ? to
      : to.pathname
    : pathname;

  return (
    <Link
      {...props}
      to={{
        pathname: targetPathname,
        search: getSearchWith(new URLSearchParams(search), params),
      }}
    >
      {children}
    </Link>
  );
};
