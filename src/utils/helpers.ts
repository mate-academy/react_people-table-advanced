import { Person } from '../types';

export const formatString = (name: string) => name.toLowerCase();

export const preparePeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(
      possibleMother => possibleMother.name === person.motherName,
    );
    const father = people.find(
      possibleFather => possibleFather.name === person.fatherName,
    );

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const filterPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
) => {
  const filteredBySex = people.filter(person => {
    if (!sex) {
      return person;
    }

    return person.sex === sex;
  });

  const filteredByCenturies = filteredBySex.filter(person => {
    if (centuries.length === 0) {
      return person;
    }

    const personCentury = Math.ceil(person.born / 100);

    return centuries.includes(`${personCentury}`);
  });

  const filteredByName = filteredByCenturies.filter(person => {
    if (!query) {
      return person;
    }

    const formattedQuery = formatString(query);

    const name = formatString(person.name);
    const motherName = person.motherName
      ? formatString(person.motherName)
      : null;
    const fatherName = person.fatherName
      ? formatString(person.fatherName)
      : null;

    return name.includes(formattedQuery)
    || motherName?.includes(formattedQuery)
    || fatherName?.includes(formattedQuery);
  });

  return filteredByName;
};

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  const sortedPeople = [...people].sort((currPerson, nextPerson) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return currPerson[sort].localeCompare(nextPerson[sort]);

      case 'born':
      case 'died':
        return Number(currPerson[sort]) - Number(nextPerson[sort]);

      default:
        return 0;
    }
  });

  if (!order) {
    return sortedPeople;
  }

  return sortedPeople.reverse();
};
