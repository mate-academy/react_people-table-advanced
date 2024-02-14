import { Person } from '../types';
import { Filter, SortOptions } from '../types/Filter';

export function getPersonParent(
  person: Person,
  people: Person[],
  parent: 'mother' | 'father',
): Person | string {
  if (parent === 'mother') {
    if (person.motherName === null) {
      return '-';
    }

    return people.find(
      isParent => isParent.name === person.motherName,
    )
      || person.motherName;
  }

  if (parent === 'father') {
    if (person.fatherName === null) {
      return '-';
    }

    return people.find(
      isParent => isParent.name === person.fatherName,
    )
      || person.fatherName;
  }

  return '-';
}

export function preparePeople(
  people: Person[],
  filterOptions: Filter,
  sortOptions: SortOptions,
) {
  // eslint-disable-next-line object-curly-newline
  const { sex, name, centuries } = filterOptions;
  const { column, order } = sortOptions;

  const filteredPeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (name) {
      const personName = person.name.toLowerCase();
      const motherName = person.motherName?.toLowerCase();
      const fatherName = person.fatherName?.toLocaleLowerCase();

      if (!personName.includes(name)
        && !motherName?.includes(name)
        && !fatherName?.includes(name)) {
        return false;
      }
    }

    if (centuries.length) {
      const personCentury = Math.ceil(person.born / 100);

      if (!centuries.includes(`${personCentury}`)) {
        return false;
      }
    }

    return true;
  });

  if (column) {
    filteredPeople.sort((person1, person2) => {
      switch (column) {
        case 'born':
        case 'died':
          return person1[column] - person2[column];
        case 'name':
        case 'sex':
          return person1[column].localeCompare(person2[column]);
        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
}
