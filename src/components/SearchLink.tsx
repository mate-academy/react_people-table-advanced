import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

type Props = LinkProps & { preserveSearch?: boolean };

export const SearchLink: React.FC<Props> = ({
  preserveSearch = true,
  to,
  ...rest
}) => {
  const location = useLocation();

  let targetTo = to;

  if (preserveSearch) {
    if (typeof to === 'string') {
      const hasSearch = to.includes('?');

      targetTo = hasSearch ? to : `${to}${location.search || ''}`;
    } else {
      targetTo = {
        ...to,
        search: to.search ?? location.search,
      };
    }
  }

  return <Link to={targetTo} {...rest} />;
};
