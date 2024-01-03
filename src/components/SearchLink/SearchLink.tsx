import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith, Params } from '../../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: Params,
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        search: getSearchWith(params, searchParams),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
