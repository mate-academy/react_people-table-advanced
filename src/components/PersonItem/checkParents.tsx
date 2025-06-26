import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

export const mother = (person: Person) => {
  if (!person.motherName) {
    return '-';
  }

  if (person.mother?.name === person.motherName) {
    return <PersonLink person={person.mother} />;
  }

  return person.motherName;
};

export const father = (person: Person) => {
  if (!person.fatherName) {
    return '-';
  }

  if (person.father?.name === person.fatherName) {
    return <PersonLink person={person.father} />;
  }

  return person.fatherName;
};
