import React from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  to?: LinkProps['to'];
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  to,
  params,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const pathname = typeof to === 'string' ? to : to?.pathname;

  return (
    <Link
      to={{
        pathname,
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
