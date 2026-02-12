import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the standard `Link`, we take all its props except for `to`,
 * along with the custom `params` prop that we use for updating the search params
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

/**
 * SearchLink updates the given `params` in the search while keeping the `pathname`
 * and other existing search parameters (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // the content between the opening and closing tags
  params, // the params to be updated in the `search`
  ...props // all usual Link props like `className`, `style`, and `id`
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params), // constructs the new search with updated params
      }}
      {...props} // spread all other props
    >
      {children}
    </Link>
  );
};
