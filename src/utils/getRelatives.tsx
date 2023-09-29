import { ReactNode } from 'react';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { Relative } from '../types/Relative';

export const getRelatives = (
  person: Person, relative: string,
): ReactNode | string => {
  if (relative === Relative.Father) {
    if (person.father) {
      return <PersonLink person={person.father} />;
    }

    if (person.fatherName) {
      return person.fatherName;
    }
  }

  if (relative === Relative.Mother) {
    if (person.mother) {
      return <PersonLink person={person.mother} />;
    }

    if (person.motherName) {
      return person.motherName;
    }
  }

  return '-';
};
