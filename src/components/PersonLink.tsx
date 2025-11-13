import classNames from 'classnames';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person | null;
  name?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const location = useLocation();
  if (!name) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{name}</span>;
  }

  const linkClass = classNames({ 'has-text-danger': person.sex === 'f' });

  return (
    <Link to={`/people/${person.slug}${location.search}`} className={linkClass}>
      {person.name}
    </Link>
  );
};
