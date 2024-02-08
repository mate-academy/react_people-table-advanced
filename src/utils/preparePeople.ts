import { Person } from '../types/Person';
import { FilterParams } from '../types/FilterParams';
import { SortParams } from '../types/SortParams';
import { SortOrder } from '../types/SortOrder';

const getCentury = (year: number) => Math.floor(year / 100);

const filterPeople = (people: Person[], filterParams: FilterParams) => {
  return people.filter(person => {
    if (filterParams.query
      && !person.name.toLowerCase().includes(filterParams.query)
      && !person.fatherName?.toLowerCase().includes(filterParams.query)
      && !person.motherName?.toLowerCase().includes(filterParams.query)
    ) {
      return false;
    }

    if (filterParams.sex && person.sex !== filterParams.sex) {
      return false;
    }

    if (!!filterParams.centuries.length
      && !filterParams.centuries.includes(`${getCentury(person.born)}`)) {
      return false;
    }

    return true;
  });
};

const sortPeople = (people: Person[], { sortField, sortOrder }: SortParams) => {
  const sortedPeople = people.sort((person1, person2) => {
    switch (typeof person1[sortField]) {
      case 'number': {
        return +person1[sortField] - +person2[sortField];
      }

      case 'string': {
        return (person1[sortField] as string)
          .localeCompare(person2[sortField] as string);
      }

      default: {
        return 0;
      }
    }
  });

  if (sortOrder === SortOrder.Desc) {
    return sortedPeople.reverse();
  }

  return sortedPeople;
};

export function preparePeople(
  people: Person[],
  filterParams: FilterParams,
  sortParams: SortParams,
): Person[] {
  const filteredPeople = filterPeople(people, filterParams);

  if (sortParams.sortField) {
    return sortPeople(filteredPeople, sortParams);
  }

  return filteredPeople;
}
