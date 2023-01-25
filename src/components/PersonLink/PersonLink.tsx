import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  persone: Person | null,
}

export const PersonLink: React.FC<Props> = ({ persone }) => {
  const {
    name,
    sex,
    slug,
  } = persone as Person;
  const parentPath = useResolvedPath('../').pathname;
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
      style={sex === 'f' ? { color: 'red' } : {}}
    >
      {name}
    </Link>
  );
};
