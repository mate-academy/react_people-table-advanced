import { Person } from '../types';
import { Sex } from '../types/Sex';
import { Sort } from '../types/Sort';

type PropsParams = {
  query: string | null,
  sort: string | null,
  order: string | null,
  sex: string | null,
  centuries: string[],
};

export const getPreparedPeople = (
  people: Person[], {
    query,
    sort,
    order,
    sex,
    centuries,
  }: PropsParams,
) => {
  let preparedPeople = [...people];
  const preparedQuery = query?.trim().toLowerCase();

  if (preparedQuery) {
    preparedPeople = preparedPeople.filter(person => {
      return person.name.toLowerCase().includes(preparedQuery)
        || person.fatherName?.toLowerCase().includes(preparedQuery)
        || person.motherName?.toLowerCase().includes(preparedQuery);
    });
  }

  if (sort) {
    preparedPeople = preparedPeople.sort((person1, person2) => {
      switch (sort) {
        case Sort.Name:
          return person1.name.localeCompare(person2.name);

        case Sort.Sex:
          return person1.sex.localeCompare(person2.sex);

        case Sort.Born:
          return person1.born - person2.born;

        case Sort.Died:
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => {
      return centuries.includes(
        String(Math.ceil(person.born / 100)),
      );
    });
  }

  if (sex) {
    switch (sex) {
      case Sex.All:
        return preparedPeople;

      case Sex.Male:
        return preparedPeople.filter(person => person.sex === 'm');

      case Sex.Female:
        return preparedPeople.filter(person => person.sex === 'f');

      default:
        return preparedPeople;
    }
  }

  if (order) {
    preparedPeople = preparedPeople.reverse();
  }

  return preparedPeople;
};
