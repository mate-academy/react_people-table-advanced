import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';

interface Props {
  person: Person;
}

const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person?.slug}`,
        search: location.search,
      }}
      className={person?.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person?.name || '-'}
    </Link>
  );
};

export default PersonLink;
