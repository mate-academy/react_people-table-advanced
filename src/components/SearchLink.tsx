import React from 'react';
import { Link, LinkProps, Path, useSearchParams, useLocation } from 'react-router-dom';

type ParamValue = string | string[] | null;

type Props = Omit<LinkProps, 'to'> & {
  params?: Record<string, ParamValue>;
  to?: string | Partial<Path>;
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  params = {},
  children,
  to,
  ...linkProps
}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const nextParams = new URLSearchParams(searchParams);

  Object.entries(params).forEach(([key, value]) => {
    nextParams.delete(key);

    if (Array.isArray(value)) {
      value.forEach(item => {
        nextParams.append(key, item);
      });
    } else if (value !== null) {
      nextParams.set(key, value);
    }
  });

  const search = nextParams.toString();

  // Визначаємо шлях: якщо передано 'to', використовуємо його, інакше залишаємо поточний pathname
  let targetTo: string | Partial<Path> = {
    pathname: location.pathname,
    search,
  };

  if (typeof to === 'string') {
    targetTo = { pathname: to, search };
  } else if (to) {
    targetTo = { ...to, search };
  }

  return (
    <Link {...linkProps} to={targetTo}>
      {children}
    </Link>
  );
};
