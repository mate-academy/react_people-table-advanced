import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams,
  clearQueryFunc?: React.Dispatch<React.SetStateAction<string>>
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  clearQueryFunc,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
      onClick={() => {
        if (clearQueryFunc) {
          clearQueryFunc('');
        }
      }}
    >
      {children}
    </Link>
  );
};
