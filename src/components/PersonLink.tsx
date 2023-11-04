import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

const getLinkClass = (person: Person) => classNames({
  'has-text-danger': person.sex === 'f',
});

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={getLinkClass(person)}
    >
      {person.name}
    </Link>
  );
};
