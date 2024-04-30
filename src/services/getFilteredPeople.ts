import { Person } from '../types/Person';

interface FilterParams {
  sex?: string;
  query?: string;
  centuries?: string[];
  sort?: keyof Person | '';
  order?: 'desc' | '';
}

export const getFilteredPeople = (people: Person[], params: FilterParams) => {
  const { sex, query, centuries, sort, order } = params;

  const filteredPeople = people.filter((person: Person) => {
    const isSexMatch = sex ? person.sex === sex : true;

    const isQueryMatch = query
      ? person.name.toLowerCase().includes(query?.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query?.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query?.toLowerCase())
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
