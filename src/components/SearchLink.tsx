import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the standard `Link` we take all its props except for `to`
 * along with the custom `params` prop that we use for updating the search.
 */
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

/**
 * SearchLink updates the given params in the search while keeping
 * the pathname and other existing search params.
 */
export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
