import { Person } from '../types';

export const filteringPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(({
      name,
      motherName,
      fatherName,
    }) => {
      const normalizeText = (text: string) => (
        text.toLowerCase()
      );

      return normalizeText(name + motherName + fatherName)
        .includes(normalizeText(query));
    });
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => {
      return Math.ceil(person.born / 100).toString();
    };

    filteredPeople = filteredPeople.filter(person => (
      centuries.includes(getCentury(person))
    ));
  }

  return filteredPeople;
}
