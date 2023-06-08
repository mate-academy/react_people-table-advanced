import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = Pick<Person, 'name' | 'sex' | 'slug'>;

export const PersonLink: React.FC<Props> = ({ name, sex, slug }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
    >
      {name}
    </Link>
  );
};
