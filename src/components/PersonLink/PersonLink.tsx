import React from 'react';
import cn from 'classnames';
import { Person, Sex } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = props => {
  const { person } = props;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === Sex.Female })}
    >
      {person.name}
    </Link>
  );
};
