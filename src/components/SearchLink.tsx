import {
  Link,
  LinkProps,
  useLocation,
  useSearchParams,
  To,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  to?: To;
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  to,
  ...props
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const basePath =
    typeof to === 'string'
      ? to
      : typeof to === 'object' && to?.pathname
        ? to.pathname
        : location.pathname;

  const finalTo: To = {
    pathname: basePath,
    search: getSearchWith(searchParams, params),
  };

  return (
    <Link to={finalTo} {...props}>
      {children}
    </Link>
  );
};
