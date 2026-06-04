import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type PersonLinkProps = {
  person: Person;
};

export function PersonLink({ person }: PersonLinkProps) {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
}
