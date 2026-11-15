import React from 'react';
import { Link, LinkProps, Path, useSearchParams } from 'react-router-dom';

type ParamValue = string | string[] | null;

type Props = Omit<LinkProps, 'to'> & {
  params?: Record<string, ParamValue>;
  to?: string | Partial<Path>;
};

/**
 * To replace the standard `Link` we take all its props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
export const SearchLink: React.FC<Props> = ({
  params = {},
  children,
  to,
  ...linkProps
}) => {
  const [searchParams] = useSearchParams();
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
  let targetTo: Partial<Path> = { search };

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
