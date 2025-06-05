import { FC } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={cn('', {
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);
