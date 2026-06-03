import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': isFemale,
      })}
    >
      {person.name}
    </Link>
  );
};
