import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <>
      <Link
        to={`/people/${person.slug}`}
        className={cn({
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    </>
  );
};
