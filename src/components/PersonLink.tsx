import React from 'react';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  name: string | null;
  people: Person[];
};

const PersonLink: React.FC<Props> = ({ name, people }) => {
  const { search } = useLocation();
  const personFound = people.find(person => name === person.name);

  return (
    <>
      {personFound ? (
        <Link
          className={personFound.sex === 'f' ? 'has-text-danger' : ''}
          to={{ pathname: `/people/${personFound.slug}`, search }}
        >
          {personFound.name}
        </Link>
      ) : (
        name || '-'
      )}
    </>
  );
};

export default PersonLink;
