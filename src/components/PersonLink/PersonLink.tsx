import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: parentPath + person.slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
