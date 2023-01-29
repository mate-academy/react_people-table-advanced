import classNames from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

export type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const parentPath = useResolvedPath(`../${person.slug}`).pathname;

  return (
    <Link
      to={{ search: location.search, pathname: parentPath }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      style={person.sex === 'f' ? { color: 'red' } : {}}
    >
      {person.name}
    </Link>
  );
};
