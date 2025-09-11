import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'search'> & {
  params?: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  to,
  params = {},
  ...rest
}) => {
  const [searchParams] = useSearchParams();

  let pathname = '';

  if (typeof to === 'string') {
    pathname = to;
  } else if (to && typeof to === 'object' && 'pathname' in to) {
    pathname = to.pathname || '';
  }

  const finalTo = {
    pathname,
    search: getSearchWith(searchParams, params),
  };

  return (
    <Link to={finalTo} {...rest}>
      {children}
    </Link>
  );
};
