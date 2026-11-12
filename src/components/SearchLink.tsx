import { Link, LinkProps, Path, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the standard `Link` we take all its props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<LinkProps, 'to'> & {
  params?: SearchParams;
  to?: string | Partial<Path>;
};

/**
 * To replace the standard `Link` we take all its props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
export const SearchLink: React.FC<Props> = ({
  children,
  params = {},
  to,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const search = getSearchWith(searchParams, params);

  const targetTo: Partial<Path> =
    typeof to === 'string' ? { pathname: to, search } : { ...to, search };

  return (
    <Link to={targetTo} {...props}>
      {children}
    </Link>
  );
};
