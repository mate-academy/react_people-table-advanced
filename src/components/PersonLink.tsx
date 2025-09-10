import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person;
}

const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
