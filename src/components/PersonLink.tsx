import { FC } from 'react';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
  isMother?: boolean;
}

export const PersonLink: FC<PersonLinkProps> = ({ person, isMother }) => (
  <>
    {person.name ? (
      <a
        href={`#/people/${person.slug}`}
        className={isMother ? 'has-text-danger' : ''}
      >
        {person.name}
      </a>
    ) : (
      <span>{person.name}</span>
    )}
  </>
);
