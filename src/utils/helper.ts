import {
  Gender, Person, OrderType, SortType,
} from '../types';

type FilterProps = {
  query: string;
  centuries: string[];
  sex: Gender;
  sortBy: SortType;
  order: OrderType,
};

export const prepearedPeople = (
  people: Person[],
  {
    sex,
    query,
    centuries,
    sortBy,
    order,
  }: FilterProps,
) => {
  let sortedPeople: Person[] = people;

  if (sex) {
    sortedPeople = sortedPeople.filter(
      person => person.sex === sex,
    );
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    sortedPeople = sortedPeople.filter(
      person => person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    sortedPeople = sortedPeople.filter(
      person => centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sortBy && order) {
    sortedPeople.sort(
      (person1: Person, person2: Person) => {
        switch (sortBy) {
          case SortType.Born:
          case SortType.Died:
            return order === OrderType.Asc
              ? person1[sortBy] - person2[sortBy]
              : person2[sortBy] - person1[sortBy];

          case SortType.Name:
          case SortType.Sex:
            return order === OrderType.Asc
              ? person1[sortBy].localeCompare(person2[sortBy])
              : person2[sortBy].localeCompare(person1[sortBy]);

          default:
            return 0;
        }
      },
    );
  }

  return sortedPeople;
};
