import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  centuries: string[],
  query: string,
  sex: string,
  sortFiled: keyof Person,
  order: string,
) => {
  let copyPeople = [...people];

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    copyPeople = copyPeople.filter(
      person => centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (query.trim()) {
    copyPeople = copyPeople.filter(person => {
      const queryLc = query.toLowerCase().trim();
      const nameLc = person.name.toLowerCase();
      const motherNameLc = person.motherName?.toLowerCase();
      const fatherNameLc = person.fatherName?.toLowerCase();

      return nameLc.includes(queryLc)
        || motherNameLc?.includes(queryLc)
        || fatherNameLc?.includes(queryLc);
    });
  }

  if (sortFiled) {
    copyPeople.sort((person1, person2) => {
      const firstPerson = order === 'desc'
        ? person2[sortFiled]
        : person1[sortFiled];

      const secondPerson = order === 'desc'
        ? person1[sortFiled]
        : person2[sortFiled];

      if (typeof firstPerson === 'number' && typeof secondPerson === 'number') {
        return firstPerson - secondPerson;
      }

      if (typeof firstPerson === 'string' && typeof secondPerson === 'string') {
        return firstPerson.localeCompare(secondPerson);
      }

      return 0;
    });
  }

  return copyPeople;
};
