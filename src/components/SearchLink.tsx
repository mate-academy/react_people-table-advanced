import {
  Link,
  LinkProps,
  useResolvedPath,
  useSearchParams,
} from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = LinkProps & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  to,
  ...props
}) => {
  const [searchParams] = useSearchParams();
  const resolvedPath = useResolvedPath(to);

  return (
    <Link
      to={{
        ...resolvedPath,
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
