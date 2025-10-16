import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  to: string; // caminho da rota
  params: Record<string, string | string[] | null>; // permite remover keys
};

export const SearchLink: React.FC<Props> = ({
  to,
  params,
  children,
  ...rest
}) => {
  const [searchParams] = useSearchParams();

  const search = getSearchWith(searchParams, params);
  const searchString = search ? `?${search}` : '';

  return (
    <Link to={`${to}${searchString}`} {...rest}>
      {children}
    </Link>
  );
};
