import {
  Link,
  LinkProps,
  To,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the the standard `Link` we take all it props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  to?: To;
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // this is the content between the open and closing tags
  params, // the params to be updated in the `search`
  to,
  ...props // all usual Link props like `className`, `style` and `id`
}) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const target = typeof to === 'string' ? { pathname: to } : (to ?? {});

  return (
    <Link
      to={{
        ...target,
        pathname: target.pathname ?? pathname,
        search: getSearchWith(searchParams, params),
      }}
      {...props} // copy all the other props
    >
      {children}
    </Link>
  );
};
