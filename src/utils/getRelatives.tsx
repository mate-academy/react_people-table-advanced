import { ReactNode } from 'react';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';

export const getRelatives = (
  person: Person, relative: string,
): ReactNode | string => {
  if (relative === 'father') {
    if (person.father) {
      return <PersonLink person={person.father} />;
    }

    if (person.fatherName) {
      return person.fatherName;
    }
  }

  if (relative === 'mother') {
    if (person.mother) {
      return <PersonLink person={person.mother} />;
    }

    if (person.motherName) {
      return person.motherName;
    }
  }

  return '-';
};
