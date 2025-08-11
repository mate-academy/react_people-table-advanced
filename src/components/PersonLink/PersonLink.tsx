import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person, PersonSex } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const isPersonFemale = sex === PersonSex.female;

  return (
    <Link
      className={classNames({
        'has-text-danger': isPersonFemale,
      })}
      to={`${slug}`}
    >
      {name}
    </Link>
  );
};
