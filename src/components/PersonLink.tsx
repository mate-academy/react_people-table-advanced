import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  selectedSlug: string,
};

export const PersonLink: FC<Props> = React.memo(({ person, selectedSlug }) => {
  const { name, sex } = person;

  return (
    <Link
      to={`/people/${selectedSlug}`}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
});
