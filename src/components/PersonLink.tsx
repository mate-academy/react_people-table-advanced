import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';

interface Props {
  person: Person | string | null;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return '-';
  }

  if (typeof person === 'string') {
    return person;
  }

  const personHref = `/people/${person.slug}`;
  const personName = person.name;
  const isPersonFemale = person.sex === 'f';

  return (
    <Link
      to={personHref}
      className={cn({
        'has-text-danger': isPersonFemale,
      })}
    >
      {personName}
    </Link>
  );
};
