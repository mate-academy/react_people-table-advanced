import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the standard `Link` we take all its props except for `to`
 * along with the custom `params` prop that we use for updating the search.
 * We also explicitly add `to` back as an optional string.
 */
type Props = Omit<LinkProps, 'to'> & {
  to?: string;
  params: SearchParams;
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // content between the open and closing tags
  params, // the params to be updated in the `search`
  to, // optional destination path (e.g., '/people')
  ...props // all usual Link props like `className`, `style` and `id`
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: to, // if 'to' is provided, it goes there; otherwise, stays on current page
        search: getSearchWith(searchParams, params),
      }}
      {...props} // copy all the other props
    >
      {children}
    </Link>
  );
};
