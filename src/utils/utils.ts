import { Person } from '../types/Person';

export const filterPeople = (
  people: Person[],
  sex: string | null,
  centuries: string[],
  query: string | null,
): Person[] => {
  return people.filter(person => {
    const isSexMatch = !sex || person.sex === sex;
    const isCenturyMatch =
      !centuries.length ||
      centuries.includes(Math.ceil(person.born / 100).toString());
    const trimmedQuery = query?.trim().toLowerCase();

    if (trimmedQuery) {
      const motherName = person.mother?.name || person.motherName || '';
      const fatherName = person.father?.name || person.fatherName || '';

      const isNameMatch =
        person.name.toLowerCase().includes(trimmedQuery) ||
        motherName.toLowerCase().includes(trimmedQuery) ||
        fatherName.toLowerCase().includes(trimmedQuery);

      return isSexMatch && isCenturyMatch && isNameMatch;
    }

    return isSexMatch && isCenturyMatch;
  });
};
