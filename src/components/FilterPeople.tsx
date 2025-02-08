import { Person } from "../types";

export const useFilterPeople = (
  people: Person[],
  query: string,
  gender: string ,
  centuries: string[]
): Person[] => {
  if (!people.length) return [];

  const lowerQuery = query.toLowerCase();

  return people.filter(({ name, fatherName, motherName, sex, born }) => {
    const isQueryMatch =
      !query ||
      name.toLowerCase().includes(lowerQuery) ||
      fatherName?.toLowerCase().includes(lowerQuery) ||
      motherName?.toLowerCase().includes(lowerQuery);

    const isGenderMatch = !gender || sex === gender;
    const birthCentury = Math.ceil(born / 100).toString();
    const isCenturyMatch = centuries.length === 0 || centuries.includes(birthCentury);

    return isQueryMatch && isGenderMatch && isCenturyMatch;
  });
};
