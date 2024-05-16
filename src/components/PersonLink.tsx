import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  person: {
    slug: string;
    name: string;
    sex: string;
  };
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  // console.log(person)
  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name.trim()}
    </Link>
  );
};
