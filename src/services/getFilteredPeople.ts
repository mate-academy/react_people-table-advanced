import { Person } from '../types/Person';

interface FilterParams {
  sex?: string;
  q?: string;
  centuries?: string[];
  sort?: keyof Person | '';
  order?: 'desc' | '';
}

export const getFilteredPeople = (people: Person[], params: FilterParams) => {
  const { sex, q, centuries, sort, order } = params;

  const filteredPeople = people.filter((person: Person) => {
    const isSexMatch = sex ? person.sex === sex : true;

    const isQueryMatch = q
      ? person.name.toLowerCase().includes(q?.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(q?.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(q?.toLowerCase())
      : true;

    const isCenturyMatch =
      centuries && !!centuries.length
        ? centuries.some(
            century =>
              person.born >= Number(century) * 100 - 99 &&
              person.born <= Number(century) * 100,
          )
        : true;

    return isSexMatch && isQueryMatch && isCenturyMatch;
  });

  if (sort) {
    filteredPeople.sort((a, b) => {
      const valueA = a[sort]?.toString() || '';
      const valueB = b[sort]?.toString() || '';
      const comparison = valueA.localeCompare(valueB, undefined, {
        numeric: true,
      });

      if (order === 'desc') {
        return -comparison;
      }

      return comparison;
    });
  }

  return filteredPeople;
};
