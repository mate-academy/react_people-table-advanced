import {
  Link,
  LinkProps,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

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
