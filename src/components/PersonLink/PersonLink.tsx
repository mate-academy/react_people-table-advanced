import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { Gender } from '../../enum';

interface Props {
  person: Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return null;
  }

  const { slug, name, sex } = person;

  return (
    <>
      {sex === Gender.M ? (
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
