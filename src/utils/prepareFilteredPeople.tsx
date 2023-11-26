import { Person } from '../types';
import { Sort } from '../types/Sort';
import { Filter } from '../types/Filter';

export const prepareFilteredPeople = (people: Person[], filter: Filter) => {
  let peoples = [...people];

  if (filter.sex) {
    peoples = peoples
      .filter((person => (person.sex === filter.sex)));
  }

  if (filter.centuries.length) {
    peoples = peoples.filter(person => {
      return (
        filter.centuries.includes(Math.ceil(person.born / 100).toString())
      );
    });
  }

  if (filter.query) {
    peoples = peoples.filter(
      input => input.name.toLowerCase().includes(filter.query)
        || input.motherName?.toLowerCase().includes(filter.query)
        || input.fatherName?.toLowerCase().includes(filter.query),
    );
  }

  if (filter.sort) {
    peoples.sort((a, b) => {
      switch (filter.sort) {
        case Sort.Name:
        case Sort.Sex:
          return a[filter.sort].localeCompare(b[filter.sort]);
        case Sort.Born:
        case Sort.Died:
          return (a[filter.sort] - b[filter.sort]);
        default: return 0;
      }
    });
  }

  if (filter.order) {
    peoples.reverse();
  }

  return peoples;
};
