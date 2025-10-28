import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { Person } from '../types';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = Omit<LinkProps, 'to'> & {
  person?: Person | null;
  fallbackName?: string | null;
  params?: SearchParams;
};

export const SearchLink: React.FC<Props> = ({
  person,
  fallbackName,
  params = {},
  children,
  className,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  if (!person && !fallbackName) {
    return <span>-</span>;
  }

  const name = person?.name || fallbackName;
  const slug = person?.slug;

  const linkClass = classNames(className, {
    'has-text-link': person?.sex === 'm',
    'has-text-danger': person?.sex === 'f',
  });

  return slug ? (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: getSearchWith(searchParams, params),
      }}
      className={linkClass}
      {...props}
    >
      {name}
    </Link>
  ) : (
    <span>{name}</span>
  );
};
