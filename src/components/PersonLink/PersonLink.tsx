import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: FC<PersonLinkProps> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const {
    name,
    sex,
    slug,
  } = person;

  const FEMALE = 'f';

  const linkClasses = classNames('has-text-link', {
    'has-text-danger': sex === FEMALE,
  });

  return (
    <Link
      to={`/people/${slug}?${searchParams}`}
      className={linkClasses}
    >
      {name}
    </Link>
  );
};
