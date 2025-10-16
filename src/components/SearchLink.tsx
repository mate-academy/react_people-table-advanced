import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  to: string;
  params: Record<string, string | string[]>;
  children: React.ReactNode;
};

export const SearchLink: React.FC<Props> = ({ to, params, children }) => {
  const [searchParams] = useSearchParams();

  const search = getSearchWith(searchParams, params);

  return <Link to={{ pathname: to, search }}>{children}</Link>;
};
