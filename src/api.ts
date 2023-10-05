import { Person } from './types/Person';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const NOT_SET_VALUE = '-';

export enum ColumnNames {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
}

export enum PersonSex {
  All = '',
  Male = 'm',
  Female = 'f',
}

export type FilterType = {
  query: string | '';
  centuries: string[];
  sex: string | '';
};

export const CENTURIES = ['16', '17', '18', '19', '20'];

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

function getParent(people: Person[], parentName: string) {
  return people.find(({ name }) => name === parentName);
}

export function addParent(people: Person[]) {
  return people.map(person => {
    let mother;
    let father;

    if (person.motherName) {
      mother = getParent(people, person.motherName);
    }

    if (person.fatherName) {
      father = getParent(people, person.fatherName);
    }

    return {
      ...person,
      mother,
      father,
    };
  });
}

export const sortPeople = (people: Person[], sortParam: string) => {
  if (sortParam) {
    return [...people].sort((a, b) => {
      switch (sortParam) {
        case ('name'): {
          return a[sortParam].localeCompare(b[sortParam]);
        }

        case ('sex'): {
          return a[sortParam].localeCompare(b[sortParam]);
        }

        case ('born'): {
          return a[sortParam] - (b[sortParam]);
        }

        case ('died'): {
          return a[sortParam] - (b[sortParam]);
        }

        default: {
          return 0;
        }
      }
    });
  }

  return [...people];
};

export const filterPeople = (
  filterOption: FilterType,
  people: Person[],
) => {
  return people
    .filter(person => {
      if (filterOption.sex) {
        return person.sex === filterOption.sex;
      }

      return person;
    })
    .filter(person => {
      if (filterOption.centuries.length) {
        const personBirthCentury = Math.ceil(person.born / 100);

        return filterOption.centuries.includes(personBirthCentury.toString());
      }

      return person;
    })
    .filter(person => {
      if (filterOption.query) {
        return person.name.includes(filterOption.query)
        || person.motherName?.includes(filterOption.query)
        || person.fatherName?.includes(filterOption.query);
      }

      return person;
    });
};
