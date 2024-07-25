import { Link, LinkProps, useLocation } from 'react-router-dom';
import { getSearchWith, SearchParams } from './searchHelper';

export type SearchLinkParams = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<SearchLinkParams> = ({
  children,
  params,
  ...props
}: SearchLinkParams) => {
  const { search } = useLocation();

  return (
    <Link to={{ search: getSearchWith(search, params) }} {...props}>
      {children}
    </Link>
  );
};
