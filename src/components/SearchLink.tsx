import {
  Link,
  LinkProps,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the standard <Link>, this component accepts:
 * - all LinkProps (except `to`)
 * - `params` — search parameters to update
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation(); // get the current path (e.g. /people)

  return (
    <Link
      to={{
        pathname: location.pathname,
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
