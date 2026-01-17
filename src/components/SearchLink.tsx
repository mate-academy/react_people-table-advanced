import { NavLink, NavLinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

/**
 * To replace the the standard `NavLink` we take all it props
 * along with the custom `params` prop that we use for updating the search
 */
type Props = Omit<NavLinkProps, 'to'> & {
  params?: SearchParams;
  to?: NavLinkProps['to'];
};

/**
 * SearchLink updates the given `params` in the search keeping the `pathname`
 * and the other existing search params (see `getSearchWith`)
 */
export const SearchLink: React.FC<Props> = ({
  children, // this is the content between the open and closing tags
  params, // the params to be updated in the `search`
  to,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const targetTo = typeof to === 'object' ? to : { pathname: to };

  return (
    <NavLink
      to={{
        ...targetTo,
        search: getSearchWith(searchParams, params || {}),
      }}
      {...props}
    >
      {children}
    </NavLink>
  );
};
