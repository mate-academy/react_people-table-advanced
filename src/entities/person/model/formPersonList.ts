import { Person, APIPerson } from '../types';

export const formPersonList = (apiPeople: APIPerson[]): Person[] => {
  const people: Person[] = apiPeople.map(p => ({
    ...p,
    motherName: p.motherName ?? '-',
    fatherName: p.fatherName ?? '-',
    mother: undefined,
    father: undefined,
  }));

  people.forEach(person => {
    if (person.motherName !== '-') {
      // eslint-disable-next-line no-param-reassign
      person.mother = people.find(p => p.name === person.motherName);
    }

    if (person.fatherName !== '-') {
      // eslint-disable-next-line no-param-reassign
      person.father = people.find(p => p.name === person.fatherName);
    }
  });

  return people;
};
