import { Person, Sex } from '../types';

export const getVisiblePeople = (people: Person[]) => {
  const peopleMap = new Map();

  people.forEach(person => {
    peopleMap.set(person.name, person);
  });

  const visiblePeople = people.map(person => {
    const mother = peopleMap.get(person.motherName);
    const father = peopleMap.get(person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  return visiblePeople;
};

export const getPeopleFiltered = (
  people: Person[],
  sex: Sex | null,
  query: string | null,
  centuries: string[],
) => {
  const filteredBySex = people.filter(person => {
    return !sex ? person : person.sex === sex;
  });

  const filteredByName = filteredBySex.filter(person => {
    const { name, fatherName, motherName } = person;

    if (!query) {
      return person;
    }

    const normalizedQuery = query.toLowerCase();

    return name.toLowerCase().includes(normalizedQuery)
      || fatherName?.toLowerCase().includes(normalizedQuery)
      || motherName?.toLowerCase().includes(normalizedQuery);
  });

  const filteredByCenturies = filteredByName.filter(person => {
    const appliedCentury = Math.ceil(person.born / 100);

    return centuries.length !== 0 ? centuries.includes(`${appliedCentury}`) : person;
  });

  return filteredByCenturies;
};

export const getPeopleSorted = (
  people: Person[],
  order: string | null,
  sort: string | null,
) => {
  const sortedPeople = [...people].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);

      case 'born':
      case 'died':
        return +a[sort] - +b[sort];

      default:
        return 0;
    }
  });

  return order ? sortedPeople.reverse() : sortedPeople;
};
