import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { Props } from './Props';

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  ...props
}) => {
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
