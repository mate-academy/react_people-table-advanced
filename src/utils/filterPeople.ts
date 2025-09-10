import { Person } from '../types';
import { FiltersParams } from '../types/FilterParams';

export const filterPeople = (people: Person[], filters: FiltersParams) => {
  const { sex, query, centuries } = filters;
  const normalizedQuery = query?.toLowerCase();

  return people.filter(person => {
    const personSex = !sex || sex === person.sex;
    const nameMatch =
      !normalizedQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);
    const centuryMatch =
      !centuries ||
      centuries.length === 0 ||
      centuries.includes(Math.ceil(person.born / 100).toString());

    return personSex && centuryMatch && nameMatch;
  });
};
