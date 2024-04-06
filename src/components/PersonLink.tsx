import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person | undefined;
}

const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person?.slug}`}
    className={person?.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person?.name || '-'}
  </Link>
);

export default PersonLink;
