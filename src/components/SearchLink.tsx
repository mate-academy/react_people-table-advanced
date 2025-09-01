import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

type Props = LinkProps & { preserveSearch?: boolean };

export const SearchLink: React.FC<Props> = ({
  preserveSearch = true,
  to,
  ...rest
}) => {
  const { search } = useLocation();
  let targetTo = to;

  if (preserveSearch) {
    if (typeof to === 'string') {
      targetTo = to.includes('?') ? to : `${to}${search || ''}`;
    } else {
      targetTo = { ...to, search: to.search ?? search };
    }
  }

  return <Link to={targetTo} {...rest} />;
};
