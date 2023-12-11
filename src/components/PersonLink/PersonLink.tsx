import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { Gender } from '../../enum';

interface Props {
  person: Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return null;
  }

  const { slug, name, sex } = person;

  return (
    <>
      {sex === Gender.M ? (
        <Link
          to={{
            pathname: `../${slug}`,
            search: searchParams.toString(),
          }}
        >
          {name}
        </Link>
      ) : (
        <Link
          className="has-text-danger"
          to={{
            pathname: `../${slug}`,
            search: searchParams.toString(),
          }}
        >
          {name}
        </Link>
      )}
    </>
  );
};
