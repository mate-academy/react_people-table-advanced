import { Person } from '../types';

export const linkParents = (people: Person[]) => {
  const peopleMap = new Map(people.map(person => [person.name, person]));

  return people.map(person => ({
    ...person,
    motherName: person.motherName || '-',
    fatherName: person.fatherName || '-',
    mother: person.motherName ? peopleMap.get(person.motherName) : undefined,
    father: person.fatherName ? peopleMap.get(person.fatherName) : undefined,
  }));
};

export const filterAndSortPeople = (
  people: Person[] | null,
  gender?: string,
  query?: string,
  centuries?: string[],
  sortBy?: string,
  order?: string,
): Person[] | null => {
  if (!people) {
    return null;
  }

  let filteredPeople = [...people];

  if (gender) {
    filteredPeople = filteredPeople.filter(person => person.sex === gender);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(person => {
      const { name, motherName = '', fatherName = '' } = person;

      return (
        name.toLowerCase().includes(lowerQuery) ||
        motherName?.toLowerCase().includes(lowerQuery) ||
        fatherName?.toLowerCase().includes(lowerQuery)
      );
    });
  }

  if (centuries?.length) {
    filteredPeople = filteredPeople.filter(person => {
      const birthCentury = Math.floor(person.born / 100) + 1;

      return centuries.includes(`${birthCentury}`);
    });
  }

  if (sortBy) {
    filteredPeople.sort((person1, person2) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return person1[sortBy].localeCompare(person2[sortBy]);
        case 'born':
        case 'died':
          return person1[sortBy] - person2[sortBy];

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
};
