import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

type Props = {
  to: SearchParams;
  children: React.ReactNode
};

export const LinkWithParams:React.FC<Props>
= ({
  children,
  to,
}) => {
  const [params] = useSearchParams();

  return (
    <Link
      to={{ search: getSearchWith(params, to) }}
    >
      {children}
    </Link>
  );
};
