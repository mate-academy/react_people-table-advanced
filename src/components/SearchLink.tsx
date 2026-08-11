import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = {
  params: SearchParams;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

export const SearchLink: React.FC<Props> = ({
  params,
  children,
  className,
  ...rest
}) => {
  const { search } = useLocation();
  const newSearch = getSearchWith(params, new URLSearchParams(search));

  return (
    <Link className={className} to={{ search: newSearch.toString() }} {...rest}>
      {children}
    </Link>
  );
};
