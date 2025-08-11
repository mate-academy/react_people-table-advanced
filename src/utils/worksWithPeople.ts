import { Person, PersonKey } from '../types';

export const sortPeople = (
  people: Person[],
  sort: PersonKey,
  order: string,
) => {
  if (sort === 'born' || sort === 'died') {
    return people.sort((first, second) => {
      if (typeof first[sort] === 'number' && typeof second[sort] === 'number') {
        return !!order
          ? second[sort] - first[sort]
          : first[sort] - second[sort];
      }

      return 0;
    });
  }

  if (sort === 'name' || sort === 'sex') {
    return people.sort((first, second) => {
      if (typeof first[sort] === 'string' && typeof second[sort] === 'string') {
        return !!order
          ? second[sort].localeCompare(first[sort])
          : first[sort].localeCompare(second[sort]);
      }

      return 0;
    });
  }

  return people;
};

export const filterForPeople = (
  people: Person[],
  query: string,
  centuries: string[],
  gender: string,
) => {
  let newPeople = [...people];

  if (!!gender) {
    switch (gender) {
      case 'f':
        newPeople = newPeople.filter(({ sex }) => sex === 'f');
        break;

      case 'm':
        newPeople = newPeople.filter(({ sex }) => sex === 'm');
        break;
    }
  }

  if (!!centuries.length) {
    newPeople = newPeople.filter(({ born }) =>
      centuries.includes(`${+String(born).slice(0, 2) + 1}`),
    );
  }

  if (!!query) {
    const normalizeQuery = query.toLowerCase();

    const includeQwery = (person: string) =>
      person.toLowerCase().includes(normalizeQuery);

    newPeople = newPeople.filter(
      ({ name, motherName, fatherName }) =>
        includeQwery(name) ||
        (motherName && includeQwery(motherName)) ||
        (fatherName && includeQwery(fatherName)),
    );
  }

  return newPeople;
};
