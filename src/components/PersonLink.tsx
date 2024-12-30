import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { Sex } from '../types/Sex';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${slug}`, search }}
      className={cn({ 'has-text-danger': sex === Sex.F })}
    >
      {name}
    </Link>
  );
};
