import { Person } from './types';
import { FilterParams } from './types/FilterParams';
import { Sex } from './types/Sextype';
import { SortOrder } from './types/SortOrder';
import { SortType } from './types/SortType';

const NOT_SET_VALUE = '-';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => person.motherName === mom.name);
    const father = people.find(dad => person.fatherName === dad.name);
    const motherName = !person.motherName ? NOT_SET_VALUE : person.motherName;
    const fatherName = !person.fatherName ? NOT_SET_VALUE : person.fatherName;
    const century = Math.ceil(person.born / 100);

    return {
      ...person,
      motherName,
      fatherName,
      father,
      mother,
      century,
    };
  });
};

function sortPeople(
  people: Person[],
  sortType: SortType,
  sortOrder: SortOrder,
) {
  const sortedPeople = [...people];

  if (sortType && sortOrder === SortOrder.Asc) {
    return sortedPeople.sort((p1, p2) => {
      switch (sortType) {
        case SortType.Name:
          return p1.name.localeCompare(p2.name);
        case SortType.Sex:
          return p1.sex.localeCompare(p2.sex);
        case SortType.Born:
          return p1.born - p2.born;
        case SortType.Died:
          return p1.died - p2.died;
        default: return 0;
      }
    });
  }

  if (sortType && sortOrder === SortOrder.Desc) {
    return sortedPeople.sort((p1, p2) => {
      switch (sortType) {
        case SortType.Name:
          return p2.name.localeCompare(p1.name);
        case SortType.Sex:
          return p2.sex.localeCompare(p1.sex);
        case SortType.Born:
          return p2.born - p1.born;
        case SortType.Died:
          return p2.died - p1.died;
        default: return 0;
      }
    });
  }

  return sortedPeople;
}

export const getFilteredPeople = (
  people: Person[], searchparams: URLSearchParams,
) => {
  const searchQuery = searchparams.get(FilterParams.Query);
  const sexFilter = searchparams.get(FilterParams.Sex);
  const centuriesFilter = searchparams.getAll(FilterParams.Century);
  const sortType = searchparams.get('sort') as SortType;
  const sortOrder = searchparams.get('order') as SortOrder;
  const preparedQuery = searchQuery ? searchQuery.toLowerCase() : '';

  let peopleToRender = [...people];

  if (searchQuery) {
    peopleToRender = peopleToRender.filter(
      person => person.name.toLowerCase().includes(preparedQuery)
      || person.motherName?.toLowerCase().includes(preparedQuery)
      || person.fatherName?.toLowerCase().includes(preparedQuery),
    );
  }

  if (sexFilter) {
    peopleToRender = peopleToRender.filter(person => {
      switch (sexFilter) {
        case Sex.Male:
          return person.sex === 'm';
        case Sex.Female:
          return person.sex === 'f';
        default:
          return person;
      }
    });
  }

  if (centuriesFilter.length > 0) {
    peopleToRender = peopleToRender.filter(person => {
      const personCentury = person.century?.toString() || '';

      return centuriesFilter.includes(personCentury);
    });
  }

  return sortPeople(peopleToRender, sortType, sortOrder);
};
