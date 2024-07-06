import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';

export const chooseMotherLink = (person: Person) => {
  if (!person.motherName) {
    return `-`;
  }

  if (person.mother) {
    return <PersonLink person={person.mother} />;
  }

  return `${person.motherName}`;
};

export const chooseFatherLink = (person: Person) => {
  if (!person.fatherName) {
    return `-`;
  }

  if (person.father) {
    return <PersonLink person={person.father} />;
  }

  return `${person.fatherName}`;
};

export function fillteringPeople(
  people: Person[] | null,
  gender: string,
  query: string,
  centuries: string[],
) {
  if (!people) {
    return [];
  }

  let newPeople = [...people];

  if (gender) {
    newPeople = newPeople.filter(person => person.sex === gender);
  }

  if (query) {
    newPeople = newPeople.filter(
      person =>
        person.name.includes(query) ||
        person.motherName?.includes(query) ||
        person.fatherName?.includes(query),
    );
  }

  if (centuries.length > 0) {
    let filteredCenturies: Person[] = [];

    centuries.forEach(century => {
      const currentCentury = +century;

      const filteredCentury = people.filter(
        person => Math.ceil(person.born / 100) === currentCentury,
      );

      filteredCenturies = [...filteredCenturies, ...filteredCentury];
    });

    newPeople = filteredCenturies;
  }

  return newPeople;
}

export function sortPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] {
  if (!sort && !order) {
    return people;
  }

  return people.sort((a, b) => {
    switch (sort) {
      case 'name':
        return order === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      case 'sex':
        if (order === 'desc') {
          return a.sex === 'm' ? -1 : 1;
        } else {
          return a.sex === 'f' ? -1 : 1;
        }

      case 'born':
        return order === 'desc' ? b.born - a.born : a.born - b.born;
      case 'died':
        return order === 'desc' ? b.died - a.died : a.died - b.died;
      default:
        return 0;
    }
  });
}
