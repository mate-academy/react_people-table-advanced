import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => (
  <Link
    to={`/people/${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </Link>
);
