import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the the standard `Link` we take all it props except for `to`
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<LinkProps, 'to'> & {
  to: string; // the `pathname` to navigate to
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  to,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: to,
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
