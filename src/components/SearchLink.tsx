import React from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  to: string | { pathname?: string; search?: string };
  params?: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  to,
  params = {},
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const pathname = typeof to === 'string' ? to : to.pathname || '';
  const search = getSearchWith(searchParams, params);

  return (
    <Link to={{ pathname, search }} {...props}>
      {children}
    </Link>
  );
};
