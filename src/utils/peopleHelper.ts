import { FilterParams } from '../types/FilterParams';
import { Person } from '../types/Person';

export function getParent(people: Person[], personParentName: string) {
  return people.find(parent => parent.name === personParentName);
}

export function getPeopleWithParents(people: Person[]) {
  const peopleWithParents = [...people].map(person => {
    const child = { ...person };

    if (child.motherName) {
      child.mother = getParent(people, child.motherName);
    } else {
      child.motherName = '-';
    }

    if (child.fatherName) {
      child.father = getParent(people, child.fatherName);
    } else {
      child.fatherName = '-';
    }

    return child;
  });

  return peopleWithParents;
}

export function getPreparedPeople(people: Person[], filter: FilterParams) {
  const { sex, query, centuries, sort, order } = filter;
  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      if (centuries.includes(`${century}`)) {
        return true;
      }

      return;
    });
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const { name: personName, fatherName, motherName } = person;
      const names = [
        personName.toLowerCase(),
        motherName?.toLowerCase(),
        fatherName?.toLowerCase(),
      ];
      const lowerQuery = query.toLowerCase();

      for (const name of names) {
        if (name?.includes(lowerQuery)) {
          return person;
        }
      }

      return;
    });
  }

  if (sort) {
    const multiplier = order ? -1 : 1;

    switch (sort) {
      case 'name':
        visiblePeople.sort(
          ({ name: name1 }, { name: name2 }) =>
            multiplier * name1.localeCompare(name2),
        );
        break;

      case 'sex':
        visiblePeople.sort(
          ({ sex: sex1 }, { sex: sex2 }) =>
            multiplier * sex1.localeCompare(sex2),
        );
        break;

      case 'born':
        visiblePeople.sort(
          ({ born: born1 }, { born: born2 }) => multiplier * (born1 - born2),
        );
        break;

      case 'died':
        visiblePeople.sort(
          ({ died: died1 }, { died: died2 }) => multiplier * (died1 - died2),
        );
        break;
    }
  }

  return visiblePeople;
}
