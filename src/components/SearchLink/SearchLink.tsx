import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

/**
 * Updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
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
