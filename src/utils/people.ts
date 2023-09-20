import { Person } from '../types';

interface Params {
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
}

function sortPeople(people: Person[], sortBy: string) {
  if (people.length < 2) {
    return people;
  }

  const copy = [...people];
  const key = sortBy as keyof Person;

  switch (sortBy) {
    case 'name':
    case 'sex':
      return copy.sort((a, b) => {
        const person1 = a[key] as string;
        const person2 = b[key] as string;

        return person1.localeCompare(person2);
      });

    case 'born':
    case 'died':
      return copy.sort((a, b) => {
        if (a[key] && b[key]) {
          const person1 = a[key] as number;
          const person2 = b[key] as number;

          return +person1 - +person2;
        }

        return 0;
      });

    default:
      return people;
  }
}

export function preparePeople(people: Person[], {
  query,
  sex,
  centuries,
  sort,
  order,
}: Params): Person[] {
  let copy = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    copy = copy.filter(person => {
      const name = person.name.toLowerCase();
      const fatherName = person.fatherName?.toLowerCase() || '';
      const motherName = person.motherName?.toLowerCase() || '';

      return name.includes(normalizedQuery)
        || fatherName.includes(normalizedQuery)
        || motherName.includes(normalizedQuery);
    });
  }

  if (sex) {
    copy = copy.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    copy = copy.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    copy = sortPeople(copy, sort);
  }

  if (sort && order) {
    copy.reverse();
  }

  return copy.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
}
