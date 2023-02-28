import { Person } from '../types';

export function getVisiblePeople(
  people: Person[],
  centuries: string[],
  sex: string | null,
  query: string | null,
  sortBy: keyof Person | null,
  isReversed: boolean,
): Person[] {
  let visiblePeople: Person[] = [...people];

  if (centuries.length > 0) {
    visiblePeople = people.filter(person => {
      const personBornCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personBornCentury);
    });
  }

  if (sex) {
    visiblePeople = people.filter(person => person.sex === sex);
  }

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    visiblePeople = people.filter(person => {
      const preparedName = person.name.toLowerCase();
      const preparedMotherName = person.motherName?.toLowerCase();
      const preparedFatherName = person.fatherName?.toLowerCase();

      return preparedName.includes(preparedQuery)
        || preparedMotherName?.includes(preparedQuery)
        || preparedFatherName?.includes(preparedQuery);
    });
  }

  if (sortBy) {
    visiblePeople.sort((personA, personB) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return personA[sortBy].localeCompare(personB[sortBy]);
        case 'born':
        case 'died':
          return personA[sortBy] - personB[sortBy];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

  return visiblePeople;
}
