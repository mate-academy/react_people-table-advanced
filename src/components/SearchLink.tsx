import {
  Link,
  LinkProps,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the standard `Link`, we take all its props except for `to`,
 * and add a custom `params` prop for updating search params,
 * and an optional `pathname` for changing the route.
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  pathname?: string;
};

/**
 * SearchLink updates the given `params` in the search while preserving
 * the current pathname (or using a custom one), and other existing params.
 */
export const SearchLink: React.FC<Props> = ({
  children,
  params,
  pathname,
  ...props
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: pathname || location.pathname,
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
