import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { Sex } from '../utils/Sex';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({
  person,
}) => {
  const { slug, name, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn(
        { 'has-text-danger': sex === Sex.Female },
      )}
    >
      {name}
    </Link>
  );
};
