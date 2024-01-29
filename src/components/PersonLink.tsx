import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Person } from '../types';

const FEMALE_SEX = 'f';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`../${slug}`}
      className={classNames({
        'has-text-danger': sex === FEMALE_SEX,
      })}
    >
      {name}
    </Link>
  );
};
