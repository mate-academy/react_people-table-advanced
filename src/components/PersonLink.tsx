import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person | null;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <a
      className={classNames({ 'has-text-danger': person?.sex === 'f' })}
      href={`#/people/${person?.slug}`}
    >
      {person?.name}
    </a>
  );
};
