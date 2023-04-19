import { Person, SearchParams, SortType } from '../types';

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);

        value.forEach(part => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });

  return newParams.toString();
}

export const getParent = (people: Person[], name: string | null) => (
  people.find(person => person.name === name)
);

export const filterPeople = (
  people: Person[],
  sex: string,
  query: string,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople
      .filter(({ sex: personSex }) => personSex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(({
      name,
      motherName,
      fatherName,
    }) => {
      const availableResults = [name, motherName, fatherName];

      return availableResults.some(
        personName => personName?.toLowerCase().includes(query.toLowerCase()),
      );
    });
  }

  if (centuries.length > 0) {
    const getCentury = (born: number) => {
      return Math.ceil(born / 100).toString();
    };

    filteredPeople = filteredPeople.filter(({ born }) => (
      centuries.includes(getCentury(born))
    ));
  }

  return filteredPeople;
};

export const sortPeople = (
  people: Person[],
  sort: string,
  order: string,
) => {
  const sortedPeople = [...people];

  if (sort) {
    switch (sort) {
      case SortType.NAME:
      case SortType.SEX:
        sortedPeople.sort((prevPerson, nextPerson) => (
          prevPerson[sort].localeCompare(nextPerson[sort])
        ));
        break;

      case SortType.BORN:
      case SortType.DIED:
        sortedPeople.sort((prevPerson, nextPerson) => (
          prevPerson[sort] - nextPerson[sort]
        ));
        break;

      default:
        break;
    }
  }

  if (order === 'desc') {
    return sortedPeople.reverse();
  }

  return sortedPeople;
};
