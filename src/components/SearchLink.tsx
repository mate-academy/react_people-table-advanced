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
  let linkTo: LinkProps['to'];

  if (typeof to === 'string') {
    linkTo = {
      pathname: to,
      search: getSearchWith(searchParams, params),
    };
  } else {
    linkTo = {
      ...to,
      search: getSearchWith(searchParams, params),
    };
  }

  return (
    <Link to={linkTo} {...props}>
      {children}
    </Link>
  );
};
