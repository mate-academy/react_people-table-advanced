import React from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  to: string;
  params?: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  to,
  params = {},
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: to,
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
