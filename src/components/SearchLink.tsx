// src/components/SearchLink.tsx
import React from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  pathname?: string; // opcjonalne, domyślnie zostaje aktualna ścieżka
};

/**
 * SearchLink: link, który aktualizuje tylko `searchParams` w URL,
 * opcjonalnie zmieniając `pathname`.
 */
export const SearchLink: React.FC<Props> = ({
  children,
  params,
  pathname,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const search = getSearchWith(searchParams, params);

  return (
    <Link
      to={{
        pathname: pathname ?? undefined,
        search: search ? `?${search}` : '',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
