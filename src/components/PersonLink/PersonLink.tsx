import { Link, LinkProps, useSearchParams, useLocation } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

/**
 * Custom Link component that handles search params manipulation with pathname support
 *
 * @param {ReactNode} children - Content to be rendered inside the link
 * @param {SearchParams} params - New search params to be applied
 * @param {boolean} [preserveParams=true] - Whether to preserve existing search params
 * @param {string} [pathname] - Optional pathname to navigate to (defaults to current path)
 * @param {...LinkProps} props - All standard Link props (except 'to')
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  preserveParams?: boolean;
  pathname?: string;
};

/**
 * SearchLink updates the given `params` in the search while optionally preserving
 * the existing search parameters and supporting pathname navigation.
 *
 * @example
 * // Preserves existing params and adds/updates new ones on current path
 * <SearchLink params={{ page: '2' }}>Next Page</SearchLink>
 *
 * @example
 * // Replaces all params and navigates to specific path
 * <SearchLink
 *   params={{ filter: 'active' }}
 *   preserveParams={false}
 *   pathname="/products"
 * >
 *   Filter Products
 * </SearchLink>
 */
export const SearchLink: React.FC<Props> = ({
  children,
  params,
  preserveParams = true,
  pathname,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const { pathname: currentPathname } = useLocation();

  // Get the current search params or start fresh if not preserving
  const currentParams = preserveParams ? searchParams : new URLSearchParams();

  // Use provided pathname or fallback to current pathname
  const targetPathname = pathname || currentPathname;

  return (
    <Link
      to={{
        pathname: targetPathname,
        search: getSearchWith(currentParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
