import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PeopleLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}?${searchParams.toString()}`}
    >
      {person.name}
    </Link>
  );
};
