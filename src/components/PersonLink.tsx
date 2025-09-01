import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const { slug, sex, name } = person;

  const isFemale = sex === 'f';

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': isFemale })}
    >
      {name}
    </Link>
  );
};
