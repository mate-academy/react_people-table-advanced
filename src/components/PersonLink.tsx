import cn from 'classnames';

import { Link, useLocation } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;
  const { search } = useLocation();

  const MALE = 'm';
  const isMale = sex === MALE;

  return (
    <Link
      to={{ pathname: `/people/${slug}`, search }}
      className={cn({ 'has-text-danger': !isMale })}
    >
      {name}
    </Link>
  );
};
