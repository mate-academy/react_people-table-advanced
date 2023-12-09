import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person | undefined;
}

const Sex = {
  M: 'm',
  F: 'f',
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return null;
  }

  const { slug, name, sex } = person;

  return (
    <>
      {sex === Sex.M ? (
        <Link to={`/people/${slug}`}>
          {name}
        </Link>
      ) : (
        <Link
          className="has-text-danger"
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      )}
    </>
  );
};
