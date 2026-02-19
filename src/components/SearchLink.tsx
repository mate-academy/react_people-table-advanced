import {
  Link,
  LinkProps,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  to?: string | { pathname?: string; search?: string; hash?: string };
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  to,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const targetPathname = typeof to === 'string' ? to : to?.pathname || pathname;

  return (
    <Link
      to={{
        pathname: targetPathname,
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
