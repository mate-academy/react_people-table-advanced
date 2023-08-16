import { Person } from '../types';

const getBornCentury = (year: number) => {
  return (Math.ceil(year / 100)).toString();
};

const getPreparedPeople = (people: Person[] | null) => {
  if (people) {
    return people.map(person => {
      const mother = people.find((mom) => mom.name === person.motherName);
      const father = people.find((dad) => dad.name === person.fatherName);

      return { ...person, mother, father };
    });
  }

  return null;
};

export const getFilteredPeople = (
  people: Person[] | null,
  query: string,
  centuries: string[],
  sex: string | null,
) => {
  const preparedPeople = getPreparedPeople(people);
  let copy = preparedPeople ? [...preparedPeople] : [];

  if (query) {
    const validQuery = query.toLowerCase();

    copy = copy.filter(
      person => person.name.toLowerCase().includes(validQuery)
      || person.motherName?.toLowerCase().includes(validQuery)
      || person.fatherName?.toLowerCase().includes(validQuery),
    );
  }

  if (sex) {
    copy = copy.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    copy = copy.filter(
      person => centuries.includes(getBornCentury(person.born)),
    );
  }

  return copy;
};
