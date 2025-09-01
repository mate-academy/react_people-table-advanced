import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const { search } = useLocation();
  const { slug, sex, name } = person;

  const isFemale = sex === 'f';

  return (
    <Link
      to={{ pathname: `/people/${slug}`, search }}
      className={classNames({ 'has-text-danger': isFemale })}
    >
      {name}
    </Link>
  );
};
