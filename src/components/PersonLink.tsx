import React from 'react';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}
export function PersonLink({ person }: PersonLinkProps) {
  return (
    <a
      className={`${person.sex === 'm' ? '' : 'has-text-danger'}`}
      href={`#/people/${person.slug}`}
    >
      {person.name}
    </a>
  );
}
