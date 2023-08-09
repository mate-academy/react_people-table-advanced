import { Person } from '../types';

type FilterObject = {
  query: string,
  sex: string | null,
  centuries: string[],
  sort: string,
  order: string,
};

export const preparePeople = (
  currentPeople: Person[],
  {
    query,
    sex,
    centuries,
    sort,
    order,
  }: FilterObject,
): Person[] => {
  const normalizeString = (str: string) => str.trim().toLowerCase();

  let copyPeople = [...currentPeople];

  if (query) {
    const normlizedQuery = normalizeString(query);

    copyPeople = copyPeople.filter(person => {
      if (person.motherName) {
        if (normalizeString(person?.motherName).includes(normlizedQuery)) {
          return true;
        }
      }

      if (person.fatherName) {
        if (normalizeString(person.fatherName).includes(normlizedQuery)) {
          return true;
        }
      }

      return normalizeString(person.name).includes(normlizedQuery);
    });
  }

  if (sex) {
    copyPeople = copyPeople.filter(person => person.sex === sex);
  }

  if (centuries.length !== 0) {
    copyPeople = copyPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    copyPeople.sort((firstPerson: Person, secondPerson: Person) => {
      switch (sort) {
        case 'Name':
          return firstPerson.name.localeCompare(secondPerson.name);
        case 'Sex':
          return firstPerson.sex.localeCompare(secondPerson.sex);
        case 'Born':
          return firstPerson.born - secondPerson.born;
        case 'Died':
          return firstPerson.died - secondPerson.died;
        default:
          return 0;
      }
    });
  }

  if (sort && order) {
    copyPeople = copyPeople.reverse();
  }

  return copyPeople;
};
