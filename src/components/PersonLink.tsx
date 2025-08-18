import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: {
    sex: string;
    name: string;
    slug: string;
  };
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
    >
      {person.name}
    </Link>
  );
};
