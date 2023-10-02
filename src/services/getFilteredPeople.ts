import { Person } from '../types';
import { QueryParams } from '../types/FilterQuery';
import { Gender } from '../types/Gender';

const getCentury = (year: number) => {
  return Math.ceil(year / 100);
};

const filterBySex = (people: Person[], sex: Gender | null) => {
  if (sex) {
    return people.filter(person => person.sex === sex);
  }

  return people;
};

const filterByQuery = (people: Person[], query: string) => {
  const normalisedQuery = query.toLowerCase().trim();

  if (normalisedQuery) {
    return people
      .filter(({ name }) => (
        name.toLowerCase().includes(normalisedQuery)
      ));
  }

  return people;
};

const filterByCentury = (people: Person[], century: string[]) => {
  const numberCentury = century.map(Number);

  if (century.length) {
    return people
      .filter(({ born }) => numberCentury.includes(getCentury(born)));
  }

  return people;
};

const getSortFunction = (sortBy: keyof Person) => {
  return (personA: Person, personB: Person): number => {
    if (typeof personA[sortBy] === 'string') {
      return (personA[sortBy] as string)
        .localeCompare(personB[sortBy] as string);
    }

    if (typeof personA[sortBy] === 'number') {
      return +(personA[sortBy] ?? 0) - +(personB[sortBy] ?? 0);
    }

    return 0;
  };
};

const sortByParam = (
  people: Person[],
  sortBy: keyof Person,
  order: string,
) => {
  const sortedPeople = [...people].sort(getSortFunction(sortBy));

  if (order) {
    return sortedPeople.reverse();
  }

  return sortedPeople;
};

export const getFilteredPeople = (people: Person[], query: QueryParams) => {
  let filteredPeople = sortByParam(people, query.sort, query.order);

  filteredPeople = filterBySex(filteredPeople, query.sex);
  filteredPeople = filterByQuery(filteredPeople, query.query);
  filteredPeople = filterByCentury(filteredPeople, query.centuries);

  return filteredPeople;
};
