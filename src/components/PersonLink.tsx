import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  name: string | null;
  people: Person[];
};

const PersonLink: React.FC<Props> = ({ name, people }) => {
  const personFound = people.find(person => name === person.name);

  return (
    <>
      {personFound ? (
        <Link
          className={personFound.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${personFound.slug}`}
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
