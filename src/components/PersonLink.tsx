import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classname from 'classnames';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <>
      <Link
        to={`/people/${person.slug}`}
        className={classname({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    </>
  );
};
