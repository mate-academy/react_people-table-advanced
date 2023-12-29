import { Person, Title } from '../types';
import { PersonSex } from '../types/enum';

const getFieldFromTitle = (column:Title, columnCode:string) => {
  switch (columnCode) {
    case 'name':
      return column.name;

    case 'sex':
      return column.sex;

    case 'born':
      return column.born;

    case 'died':
      return column.died;

    default:
      return null;
  }
};

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sortBySex: string,
  centuries: string[],
  sort: string,
  order: string,
): Person[] => {
  let filteredPeople = people.filter(todo => {
    const { name, fatherName, motherName } = todo;
    const preparedQuery = query.trim().toLowerCase();
    const preparedName = name.toLowerCase();
    const preparedFatherName = fatherName?.toLowerCase();
    const preparedMotherName = motherName?.toLowerCase();

    return preparedName.includes(preparedQuery)
    || preparedFatherName?.includes(preparedQuery)
    || preparedMotherName?.includes(preparedQuery);
  });

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(({ born }) => {
      const preaperdBorn = Math.ceil(born / 100).toString();

      return centuries.includes(preaperdBorn);
    });
  }

  if (sortBySex) {
    switch (sortBySex) {
      case PersonSex.MALE:
        filteredPeople = filteredPeople.filter(({ sex }) => sex === 'm');
        break;
      case PersonSex.FEMALE:
        filteredPeople = filteredPeople.filter(({ sex }) => sex === 'f');
        break;
      default:
        return filteredPeople;
    }
  }

  if (sort) {
    filteredPeople.sort((a, b) => {
      const aField = order
        ? getFieldFromTitle(b, sort)
        : getFieldFromTitle(a, sort);
      const bField = order
        ? getFieldFromTitle(a, sort)
        : getFieldFromTitle(b, sort);

      if (typeof aField === 'number' && typeof bField === 'number') {
        return aField - bField;
      }

      if (typeof aField === 'string' && typeof bField === 'string') {
        return aField.localeCompare(bField);
      }

      return 0;
    });
  }

  return filteredPeople;
};
