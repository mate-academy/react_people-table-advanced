import { Link, LinkProps, useSearchParams } from 'react-router-dom';

import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = LinkProps & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  to,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const search = getSearchWith(searchParams, params);

  let nextTo: LinkProps['to'];

  if (typeof to === 'string') {
    nextTo = `${to}${search}`;
  } else {
    nextTo = {
      ...(to || {}),
      search,
    };
  }

  return (
    <Link to={nextTo} {...props}>
      {children}
    </Link>
  );
};
