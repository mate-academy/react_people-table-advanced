import { Link, NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { User } from './PeoplePage';

interface Props {
  person?: User;
  name?: string;
  people?: User[];
  isNav?: boolean;
}

export const PersonLink: React.FC<Props> = ({
  person,
  name,
  people,
  isNav = false,
}) => {
  const displayName = person?.name ?? name;
  const [searchParams] = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';

  if (!displayName) {
    return <>-</>;
  }

  const target = person || people?.find(p => p.name === displayName);

  const linkClasses = classNames({
    'has-text-danger': target?.sex === 'f',
  });

  if (target?.slug) {
    return isNav ? (
      <NavLink
        to={{
          pathname: `/people/${target.slug}`,
          search,
        }}
        className={linkClasses}
      >
        {displayName}
      </NavLink>
    ) : (
      <Link
        to={{
          pathname: `/people/${target.slug}`,
          search,
        }}
        className={linkClasses}
      >
        {displayName}
      </Link>
    );
  }

  return <span className={linkClasses}>{displayName}</span>;
};
