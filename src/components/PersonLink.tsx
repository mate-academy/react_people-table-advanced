import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  search: URLSearchParams;
};

export const PersonLink = ({ person, search }: Props) => (
  <Link
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
    to={`/people/${person.slug}?${search.toString()}`}
  >
    {person.name}
  </Link>
);
