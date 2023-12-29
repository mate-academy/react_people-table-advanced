import { Person, Title } from '../types';
import { PersonSex, TableHead } from '../types/enum';

const getFieldFromTitle = (column:Title, columnCode:string) => {
  switch (columnCode) {
    case TableHead.Name:
      return column.name;

    case TableHead.Sex:
      return column.sex;

    case TableHead.Born:
      return column.born;

    case TableHead.Died:
      return column.died;

    default:
      return null;
  }
};

const filterByquery = (people:Person[], query: string) => {
  return people.filter(todo => {
    const { name, fatherName, motherName } = todo;
    const preparedQuery = query.trim().toLowerCase();
    const preparedName = name.toLowerCase();
    const preparedFatherName = fatherName?.toLowerCase();
    const preparedMotherName = motherName?.toLowerCase();

    return preparedName.includes(preparedQuery)
    || preparedFatherName?.includes(preparedQuery)
    || preparedMotherName?.includes(preparedQuery);
  });
};

const sortByColumn = (sort: string, people:Person[],
  order: string, sortBySex:string) => {
  let copePeople = [...people];

  if (sortBySex) {
    switch (sortBySex) {
      case PersonSex.MALE:
        copePeople = copePeople.filter(({ sex }) => sex === 'm');
        break;
      case PersonSex.FEMALE:
        copePeople = copePeople.filter(({ sex }) => sex === 'f');
        break;
      default:
        return people;
    }
  }

  return copePeople.sort((a, b) => {
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
};

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sortBySex: string,
  centuries: string[],
  sort: string,
  order: string,
): Person[] => {
  let filteredPeople = filterByquery(people, query);

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(({ born }) => {
      const preaperdBorn = Math.ceil(born / 100).toString();

      return centuries.includes(preaperdBorn);
    });
  }

  if (sort || sortBySex) {
    return sortByColumn(sort, filteredPeople, order, sortBySex);
  }

  return filteredPeople;
};
