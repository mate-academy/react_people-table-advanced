import React from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = {
  to: string;
  params: SearchParams;
  children: React.ReactNode;
} & Omit<LinkProps, 'to'>;

export const SearchLink: React.FC<Props> = ({
  to,
  params,
  children,
  ...rest
}) => {
  const [searchParams] = useSearchParams();
  const next = getSearchWith(searchParams, params);

  return (
    <Link
      {...rest}
      to={{
        pathname: to,
        search: next ? `?${next}` : '',
      }}
    >
      {children}
    </Link>
  );
};
