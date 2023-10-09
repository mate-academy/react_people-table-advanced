import { FilterType } from './types/FilterType';
import { Person } from './types/Person';
import { SortParam } from './types/SortParam';
import { getParent } from './utils/getParentHelper';
import { API_URL, YEARS_IN_CENTURY } from './utils/variables';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

export function addParent(people: Person[]) {
  return people.map(person => {
    const { motherName, fatherName } = person;

    return {
      ...person,
      mother: motherName ? getParent(people, motherName) : undefined,
      father: fatherName ? getParent(people, fatherName) : undefined,
    };
  });
}

export function getSortedPeople(
  people: Person[],
  sortParam: SortParam | string,
) {
  if (sortParam) {
    return [...people].sort((a, b) => {
      switch (sortParam) {
        case (SortParam.Name):
        case (SortParam.Sex): {
          return a[sortParam].localeCompare(b[sortParam]);
        }

        case (SortParam.Born):
        case (SortParam.Died): {
          return a[sortParam] - (b[sortParam]);
        }

        default: {
          return 0;
        }
      }
    });
  }

  return [...people];
}

const getFilteredPeopleHelper = (
  name: string | null,
  query: string,
) => {
  return name?.toLowerCase().includes(query);
};

export function getFilteredPeople(
  filterOption: FilterType,
  people: Person[],
) {
  let filteredPeople = people;

  if (filterOption.sex) {
    filteredPeople = filteredPeople
      .filter(person => person.sex === filterOption.sex);
  }

  if (filterOption.centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const personBirthCentury = Math.ceil(person.born / YEARS_IN_CENTURY);

      return filterOption.centuries.includes(personBirthCentury.toString());
    });
  }

  if (filterOption.query) {
    filteredPeople = filteredPeople
      .filter(person => {
        const query = filterOption.query.toLowerCase();

        return getFilteredPeopleHelper(person.name, query)
          || getFilteredPeopleHelper(person.motherName, query)
          || getFilteredPeopleHelper(person.fatherName, query);
      });
  }

  return filteredPeople;
}
