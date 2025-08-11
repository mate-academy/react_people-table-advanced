import { Person } from '../types';
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  person?: Person;
};

const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person || !person.slug) {
    return <span>{person?.name || '-'}</span>;
  }

  return (
    <Link
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
