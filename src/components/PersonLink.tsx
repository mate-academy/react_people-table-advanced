import { FC } from 'react';
import { Person } from '../types';
import classNames from 'classnames';

interface PersonLinkProps {
  person: Person;
  isMother?: boolean;
}

export const PersonLink: FC<PersonLinkProps> = ({ person, isMother }) => (
  <>
    {person.name ? (
      <a
        href={`#/people/${person.slug}`}
        className={classNames({ 'has-text-danger': isMother })}
      >
        {person.name}
      </a>
    ) : (
      <span>{person.name}</span>
    )}
  </>
);
