import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <Link
      to={`/people/${person.slug}${search ? `?${search}` : ''}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
