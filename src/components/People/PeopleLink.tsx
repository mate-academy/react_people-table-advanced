import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types/Person';

export type Props = {
  person: Person,
};

export const PeopleLink: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
