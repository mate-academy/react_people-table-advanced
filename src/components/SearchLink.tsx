import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  children: React.ReactNode;
};

export const SearchLink: React.FC<Props> = ({
  params,
  children,
  className,
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={className}
      to={{
        search: getSearchWith(searchParams, params),
      }}
    >
      {children}
    </Link>
  );
};
