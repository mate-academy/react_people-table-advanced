import { Person } from '../types/Person';
import { SortType } from '../types/SortType';

const prepare = (element: string) => {
  return element.replace(/\s/g, '').toLowerCase().trim();
};

export const filterPeople = (
  initialPeople: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortBy: string,
  sortOrder: string,
) => {
  let filteringPeople = [...initialPeople];

  if (sex) {
    filteringPeople = filteringPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteringPeople = filteringPeople.filter(person => {
      const preparedQuery = prepare(query);
      const preparedName = prepare(person.name);
      const preparedMotherName
        = person.motherName ? prepare(person.motherName) : null;
      const preparedFatherName
        = person.fatherName ? prepare(person.fatherName) : null;

      return preparedName.includes(preparedQuery)
        || (preparedMotherName && preparedMotherName.includes(preparedQuery))
        || (preparedFatherName && preparedFatherName.includes(preparedQuery));
    });
  }

  if (centuries.length) {
    filteringPeople = filteringPeople.filter(person => {
      const convertedYearToCentury = Math.ceil(person.born / 100);

      return centuries.includes(convertedYearToCentury.toString());
    });
  }

  if (sortBy) {
    filteringPeople = filteringPeople.sort((personA, personB) => {
      if (sortBy === SortType.NAME || sortBy === SortType.SEX) {
        return personA[sortBy].localeCompare(personB[sortBy]);
      }

      if (sortBy === SortType.BORN || sortBy === SortType.DIED) {
        return (personA[sortBy] - personB[sortBy]);
      }

      throw new Error("The sort type doesn't exist");
    });

    if (sortOrder) {
      filteringPeople.reverse();
    }
  }

  return filteringPeople;
};
