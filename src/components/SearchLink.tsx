import { Link, LinkProps, useSearchParams } from 'react-router-dom';

import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  to?: LinkProps['to'];
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  to,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const destination =
    typeof to === 'string'
      ? { pathname: to, search: getSearchWith(searchParams, params) }
      : { ...(to || {}), search: getSearchWith(searchParams, params) };

  return (
    <Link to={destination} {...props}>
      {children}
    </Link>
  );
};
