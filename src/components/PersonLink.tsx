import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const PersonLink = ({ person }: { person: Person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames(person.sex === 'f' ? 'has-text-danger' : '')}
    >
      {person.name}
    </Link>
  );
};
