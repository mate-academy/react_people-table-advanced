import { Person } from '../types/Person';
import { SortType } from '../types/SortType';

export const toggleCentury = (
  centuries: string[],
  newCentury: string,
): string[] => (
  centuries.includes(newCentury)
    ? centuries.filter(age => age !== newCentury)
    : [...centuries, newCentury]
);

const isYearInCentury = (year: number, centuries: string[]): boolean => (
  centuries
    .map(Number)
    .some(century => century === Math.ceil(year / 100))
);

export const orderPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sortBy: string,
  order: string,
): Person[] => {
  const isSexFilterFits = (person: Person) => !sex || person.sex === sex;
  const isQueryFilterFits = ({ name, motherName, fatherName }: Person) => (
    !query
    || [name, motherName, fatherName].some(
      personName => personName?.toLowerCase().includes(
        query.toLowerCase() ?? '',
      ),
    )
  );
  const isCenturyFilterFits = (person: Person) => (
    !centuries.length
    || isYearInCentury(person.born, centuries)
    || isYearInCentury(person.died, centuries)
  );

  const orderedPeople = people.filter(person => (
    isSexFilterFits(person)
    && isQueryFilterFits(person)
    && isCenturyFilterFits(person)
  ));

  if (sortBy) {
    orderedPeople.sort((personA, personB) => {
      switch (sortBy) {
        case SortType.Name:
        case SortType.Sex:
          return personA[sortBy].localeCompare(personB[sortBy]);
        case SortType.Born:
        case SortType.Died:
          return personA[sortBy] - personB[sortBy];
        default:
          return 0;
      }
    });
  }

  if (order) {
    orderedPeople.reverse();
  }

  return orderedPeople;
};
