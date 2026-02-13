import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person?: Person;
  nameFallBack: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, nameFallBack }) => {
  const [serachParams] = useSearchParams();

  return (
    <>
      {person ? (
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: serachParams.toString(),
          }}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      ) : (
        <span>{nameFallBack ? nameFallBack : '-'}</span>
      )}
    </>
  );
};
